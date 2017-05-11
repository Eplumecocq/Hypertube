'use strict'

const genres = ['', 'Action', 'Animation', 'Comedy', 'Documentary', 'Family', 'Film-noir', 'Horror',
                'Musical', 'Romance', 'Sport', 'War', 'Adventure', 'Biography', 'Crime', 'Drama',
                'Fantasy', 'History', 'Music', 'Mystery', 'Sci-Fi', 'Thriller', 'Western']

const languages = ['english', 'french', 'german', 'spanish', 'portuguese', 'italian']
const toSplit = ['genres', 'date', 'rating']

const Joi = require('joi')

const userReg = {
  username: Joi.string().regex(/^[a-zA-Z0-9]{3,20}$/).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().regex(/^[a-zA-Z]{1,40}$/).required(),
  lastName: Joi.string().regex(/^[a-zA-Z]{1,40}$/).required(),
  password: Joi.string().regex(/[A-Z]+/).regex(/[0-9]+/).alphanum()
            .min(8).max(100).required(),
  language: [Joi.string().valid(languages)]
}

const userLog = {
  username: Joi.string().regex(/^[a-zA-Z]{3,20}$/).required(),
  password: Joi.string().regex(/[A-Z]+/).regex(/[0-9]+/).alphanum()
            .min(8).max(100).required()
}

const userUpd = {
  email: [Joi.string().email().required()],
  firstName: [Joi.string().regex(/^[a-zA-Z]{1,40}$/)],
  lastName: [Joi.string().regex(/^[a-zA-Z]{1,40}$/)],
  password: [Joi.string().regex(/[A-Z]+/).regex(/[0-9]+/).alphanum()
            .min(8).max(100)],
  language: [Joi.string().valid(languages)]
}

const userGet = {
  username: Joi.string().regex(/^[a-zA-Z0-9\-._]{3,20}$/).required()
}

const imdbGet = {
  imdbId: Joi.string().regex(/^tt([0-9]){7}$/).required()
}

const moviesGet = {
  limit: Joi.number().min(1).max(500).default(60),
  offset: Joi.number().min(0).max(7000).default(1),
  genres: Joi.array().items(Joi.string().valid(genres)),
  q: Joi.string().regex(/^[a-zA-Z0-9\-,\s]{1,100}$/),
  order: Joi.string().valid(['rating', 'productionYear', 'runtime', 'mmr', 'title']).default('mmr'),
  search: Joi.string().valid(['title', 'actors', 'directors', 'producers']).default('title'),
  date: Joi.array().min(2).max(2).items(Joi.number().min(1800).max(2017)).default([1800, 2018]),
  axis: Joi.number().valid([-1, 1]).default(1),
  rating: Joi.array().min(2).max(2).items(Joi.number().min(0).max(10)).default([0, 10])
}

const recoverPost = {
  email: [Joi.string().email().required()]
}

const commentPost = {
  comment: Joi.string().regex(/^[a-zA-Z0-9'\s().:,-]{5,500}$/).required(),
  imdbId: Joi.string().regex(/^tt([0-9]){7}$/).required()
}

const stream = {
  imdbId: Joi.string().regex(/^tt([0-9]){7}$/).required(),
  quality: Joi.string().valid(['3D', '720p', '1080p']).required()
}

const sub = {
  imdbId: Joi.string().regex(/^tt([0-9]){7}$/).required(),
  language: Joi.string().valid(languages).required()
}

const currentMovies = {
  imdbId: Joi.string().regex(/^tt([0-9]){7}$/).required(),
  timestamp: Joi.number().min(0).required()
}

const patterns = {
  usersPOST: userReg,
  usersGET: userGet,
  mePUT: userUpd,
  seenmoviesPOST: imdbGet,
  seenmoviesDELETE: imdbGet,
  currentmoviesPOST: currentMovies,
  currentmoviesDELETE: imdbGet,
  authPOST: userLog,
  moviesGET: moviesGet,
  moviesPUT: imdbGet,
  imdbIdGET: imdbGet,
  recoverPOST: recoverPost,
  commentPOST: commentPost,
  streamGET: stream,
  subtitlesGET: sub
}

// Add pattern in pattern with key like this : routeMETHOD and it will choose it automatically
module.exports = function (req, res, next) {
  var route = req.route.path.split('/').filter(Boolean)
  var type = (route.includes('users') || route.includes('movies'))
             ? route[0] + req.method
             : route[route.length - 1] + req.method
  var body = (req.method === 'GET' || (req.method === 'PUT' && type === 'moviesPUT'))
             ? (type === 'moviesGET')
              ? req.query : req.params : req.body
  if (req.route.path.includes('stream')) {
    type = 'streamGET'
    body = Object.assign(req.params, req.query)
  } else if (req.route.path.includes('subtitles')) {
    type = 'subtitlesGET'
    body = Object.assign(req.params, req.query)
  } else if (req.route.path.includes('comment')) {
    type = 'commentPOST'
    body = Object.assign(req.body, req.params)
  }
  console.log(type, body)
  for (var index in body) {
    if (toSplit.includes(index)) body[index] = body[index].split(',')
  }
  Joi.validate(body, patterns[type], function (err, value) {
    if (type === 'moviesGET')
      for (var index in value) {
        req.query[index] = value[index]
      }
    if (!err) next()
    else next({ err })
  })
}
