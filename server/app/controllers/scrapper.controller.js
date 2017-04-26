'use strict'

const movieService = require('../services/movie.service')
const yts = require('yts')
const async = require('async')
const cheerio = require('cheerio')
const request = require('request')
const sleep = require('sleep')

const TIMEOUT = 2
const PAGE_LIMIT = 20

var movieList = []

/** Get number max of pages on YTS api */

function getYTSPageNumber (callback) {
  yts.listMovies({limit: 1}, function (err, json) {
    if (!(err)) {
      callback(Math.round(json.data.movie_count / PAGE_LIMIT))
    } else {
      console.log('error in api page count')
    }
  })
}


//   // movieService.listMovies(req.query)
//     // .then(function (data) {
//       // async.eachSeries(data, function (elem, callback) {
//         request(elem.imageMedium, function (err, response, html) {
//           console.log(response)
//           if (err) {
//             console.log(err)
//             imdb.get(elem.imdbId)
//               .then(function (data) {
//                 console.log(data)
//                 callback()
//                 // MovieSchema.update({imdbId: elem.imdbId}, {imageMedium: })                
//               })
//               .catch(err => callback(err))
//           }
//           else callback()
//         }, function () {
//           console.log('bjr')
//         })
//       })
//     })
//     .catch(err => next({ err }))
// }

/**
 * Get producers
 */

function getProducers (movie, imdbProducers, $, callback1) {
  var producers = []
  $(imdbProducers).each(function (index, producer) {
    if ($(producer).find('a').html() != null) producers.push($(producer).find('a').html().trim())
  })
  movie.producers = producers
  callback1()
}


/**
 * Get actors
 */

function getActors (movie, imdbActors, $, callback2) {
  var actors = []
  $(imdbActors).each(function (index, actor) {
    actors.push($(actor).attr('alt'))
  })
  movie.actors = actors
  callback2()
}

/**
 * Get imdb information for each film in movieList asynchronously
 */

function getIMDBinfo (callback) {
  console.time('imdb_timer')
  console.timeEnd('movieList_timer')
  console.log('\nstarting imdb timer')
  async.each(movieList, function (movie, callback1) {
    var url = 'http://www.imdb.com/title/' + movie.imdbId + '/fullcredits'

    request(url, function (err, response, html) {
      if (!err) {
        console.log('id : ', movie.imdbId)
        var $ = cheerio.load(html)
        if ($('.simpleTable').first().find('tr a').first().html() != null) {
          movie.directors = [$('.simpleTable').first().find('tr a').first().html().trim()]
        } else {
          movie.directors = []
        }
        async.parallel([
          async.apply(getProducers, movie, $('#fullcredits_content').find('*:contains("producer")')
                            .find('tr'), $),
          async.apply(getActors, movie, $('.cast_list').first().find('tr img'), $)
        ], function () {
          callback1()
        })
      } else {
        console.log(err)
        callback1()
      }
    })
  }, function () {
    callback()
  })
}


/**
 * Create an array of number from 1 to maxPage and then for each element
 * make an asynchronous call to the YTS api with the specific page number
 * and then get every result and push it onto movieList
 */

function populateYTSList (minPage, numberPage, callback) {
  console.time('movieList_timer')
  console.log('starting movieList timer')
  var total = []
  for (var i = minPage; i <= numberPage; i++) {
    total.push(i)
  }
  async.each(total, function (elem, callback1) {
    yts.listMovies({page: elem}, function (err, json) {
      if (!(err) && json != null) {
        var list = []
        async.each(json.data.movies, function (movie, callback2) {
          list.push({
            imdbId: movie.imdb_code,
            title: movie.title_english,
            productionYear: movie.year,
            runtime: movie.runtime,
            language: movie.language,
            rating: movie.rating,
            genres: movie.genres,
            summary: movie.summary,
            torrent: movie.torrents,
            background: movie.background_image,
            imageMedium: movie.medium_cover_image,
            imageLarge: movie.large_cover_image,
            comments: []
          })
          callback2()
        }, function () {
          movieList.push.apply(movieList, list)
        })
      } else {
        console.log('error in YTS api')
      }
      callback1()
    })
  }, function () {
    console.log('movieList length : ', movieList.length)
    callback()
  })
}


/**
 * Count similarities in movieList
 */

function countSimi (movieList, callback) {
  var count = 0
  for (var j = 0; j < movieList.length; j++) {
    var id = movieList[0].imdbId
    for (var i = j + 1; i < movieList.length; i++) {
      if (movieList[i].imdbId === id) {
        count = count + 1
      }
    }
  }
  console.log('count similarity :', count)
  callback()
}


/**
 * Populate the database with the movies
 */

function populateDB (callback) {
  console.log('starting to populate the DB')
  console.log('len db :', movieList.length)
  movieList.forEach(function (movie) {
    movieService.createMovie(movie)
  })
  console.timeEnd('imdb_timer')
  callback()
}


/**
 * Start a timer, make a waterfall call : give the number of pages to
 * populateYTSList and then get the result in the callback
 */

function getMovieList (offset, max, callback) {
  console.log('\n-- FROM ', offset, ' TO ', max, '--\n')
  async.waterfall([
    async.apply(populateYTSList, offset, max),
    getIMDBinfo,
    populateDB
  ], function () {
    countSimi(movieList, function () {
      console.log('\n-- DONE --\n')
    })
    callback()
  })
}


/**
 * Do the scrapping
 */

function doScrapping (numberPage) {
  var padding = 0
  var requests = []
  console.log('total number of pages : ', numberPage)
  for (var i = 1; i + padding <= numberPage; i = i + padding + 1) {
    requests.push([i, i + padding])
  }
  requests.push([i, numberPage])
  async.eachSeries(requests, function (elem, callback) {
    getMovieList(elem[0], elem[1], function () {
      console.log('sleeping... for ', TIMEOUT)
      sleep.sleep(TIMEOUT)
      movieList = []
      callback()
    })
  })
}

module.exports = {
  getYTSPageNumber,
  doScrapping,
  populateDB
}
