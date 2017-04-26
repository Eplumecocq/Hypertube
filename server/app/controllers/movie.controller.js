'use strict'

// Require the movie service

const movieService = require('../services/movie.service')

/**
 * @api {get} /movies Request all movies
 * @apiName getMovies
 * @apiGroup Movie
 * @apiPermission admin
 *
 * @apiParam {Number{1..500}} [limit] Number of movies
 * @apiParam {String} [genres] Genres separated by a , default all
 * @apiParam {String} [date] Date from 1800 to 2017 separated by a , default 1800-2017
 * @apiParam {String} [rating] iMDB rating from 0 to 10 separated by a , default 0-10
 * @apiParam {String} [search] Type of search, default title
 * @apiParam {String} [q] Search itself
 * @apiParam {Number{0..maxMovie - limit - 1}} [offset] Start at index offset
 *
 * @apiSuccess (Success : 200) {String} title Title of the movie
 * @apiSuccess (Success : 200) {String} imdbId imdbId of the movie
 * @apiSuccess (Success : 200) {Number} productionYear Year of the movie release
 * @apiSuccess (Success : 200) {Number} rating Rating of the movie
 * @apiSuccess (Success : 200) {Array} genres Genres of the movie
 * @apiSuccess (Success : 200) {String} imageMedium Link to the medium image of the movie
 */

function getMovies (req, res, next) {
  movieService.listMovies(req.query)
    .then(data => next({ type: 'ReqSuccess', data: data, code: 200 }))
    .catch(err => next({ err }))
}


/**
 * @api {get} /movies/:imdbId Request a movie
 * @apiName getMovie
 * @apiGroup Movie
 * @apiPermission authentificated
 *
 * @apiParam {String} imdbId imdbId of the user
 * @apiSuccess (Success : 200) {String} title Title of the movie
 * @apiSuccess (Success : 200) {Number} productionYear Year of the movie release
 * @apiSuccess (Success : 200) {Number} runtime Runtime of the movie
 * @apiSuccess (Success : 200) {String} language Language of the movie
 * @apiSuccess (Success : 200) {Number} rating Rating IMDB of the movie
 * @apiSuccess (Success : 200) {Array} genres Genres of the movie
 * @apiSuccess (Success : 200) {String} summary Summary of the movie
 * @apiSuccess (Success : 200) {Array} torrent Torrent of the movie
 * @apiSuccess (Success : 200) {String} background Background of the movie
 * @apiSuccess (Success : 200) {String} imageMedium Medium-sized thumbnail of the movie
 * @apiSuccess (Success : 200) {String} imageLarge Large-sized thumbnail of the movie
 * @apiSuccess (Success : 200) {Array} actors Actors of the movie
 * @apiSuccess (Success : 200) {Array} directors Directors of the movie
 * @apiSuccess (Success : 200) {Array} producers Producers of the movie
 */

function getMovie (req, res, next) {
  movieService.updateTime(req.params.imdbId)
  movieService.getMovie(req.params.imdbId)
    .then(data => next({ type: 'ReqSuccess', data: data, code: 200 }))
    .catch(err => next({ err }))
}


/**
 * @api {post} /movies Create a new comment
 * @apiName postMovie
 * @apiGroup Movie
 * @apiPermission authentificated
 *
 * @apiParam {String} imdbId imdbId of the movie
 * @apiParam {String} message Message of the comment
 * @apiParam {String} userId Id of the user
 *
 */

function createComment (req, res, next) {
  movieService.createComment(req.body.comment, req.user.username, req.params.imdbId)
    .then(data => next({ type: 'ReqSuccess', code: 200 }))
    .catch(err => next({ err }))
}

// Export all the functions

module.exports = {
  getMovies,
  getMovie,
  createComment
}
