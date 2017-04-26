'use strict'

// Require the user service

const userService = require('../services/user.service')
const movieService = require('../services/movie.service')
const publicFields = { username: 1, firstName: 1, lastName: 1, language: 1, _id: 0 }
const privateFields = { _id: 0, password: 0, createdAt: 0 }
const pic = require('../helpers/picture.helper.js')


/**
 * @api {get} /users Request all users
 * @apiName getUsers
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiSuccess (Success : 200) {String} username Username of the user
 * @apiSuccess (Success : 200) {String} firstName First name of the user
 * @apiSuccess (Success : 200) {String} lastName Last name of the user
 * @apiSuccess (Success : 200) {String} language Language preference of the user
 */

function getUsers (req, res, next) {
  userService.listUsers(publicFields)
    .then(data => next({ type: 'ReqSuccess', code: 200, data: data }))
    .catch(err => next({ err }))
}


/**
 * @api {post} /users Create a new user
 * @apiName postUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiParam {String{3..20}} username Username of the user
 * @apiParam {String} email Email of the user
 * @apiParam {String{1..40}} firstName First name of the user
 * @apiParam {String{1..40}} lastName Last name of the user
 * @apiParam {String{8..100}} password Password of the user
 * @apiParam {String} [language] Language preference of the user
 *
 */

function postUser (req, res, next) {
  userService.getUser({ username: req.body.username })
    .then(result => (!result)
      ? userService.getUser({ email: req.body.email })
        .then(result => (!result)
          ? userService.createUser(req.body)
            .then(data => {
              req.login(data, err => {
                if (err) next({ err })
                else {
                  pic.createAdorable(req.body.username)
                  next({ type: 'UserCreateSuccess', code: 201 })
                }
              })
            })
            .catch(err => next({ err }))
          : next({ type: 'MailAlreadyExist', code: 409 }))
        .catch(err => next({ err }))
      : next({ type: 'UsernameAlreadyExist', code: 409 }))
    .catch(err => next({ err }))
}

/**

 * @api {get} /users/:username Request a user
 * @apiName getUser
 * @apiGroup User
 *
 * @apiParam {String{3..20}} username Username of the user
 *
 * @apiSuccess (Success : 200) {String} username Username of the user
 * @apiSuccess (Success : 200) {String} firstName First name of the user
 * @apiSuccess (Success : 200) {String} lastName Last name of the user
 * @apiSuccess (Success : 200) {String} language Language preference of the user
 */

function getUser (req, res, next) {
  userService.getUser({ username: req.params.username }, publicFields)
    .then(data => next({ type: 'ReqSuccess', code: 200, data: data }))
    .catch(err => next({ err }))
}


/**
 * @api {get} /me Request the current user
 * @apiName getCurrentUser
 * @apiGroup User
 * @apiPermission authentificated
 *
 * @apiSuccess (Success : 200) {String} username Username of the user
 * @apiSuccess (Success : 200) {String} email Email of the user
 * @apiSuccess (Success : 200) {String} firstName First name of the user
 * @apiSuccess (Success : 200) {String} lastName Last name of the user
 * @apiSuccess (Success : 200) {String} language Language preference of the user
 * @apiSuccess (Success : 200) {Array} currentMovies Movies that the current user hasn't finished watching
 * @apiSuccess (Success : 200) {Array} seenMovies Movies that the current user has seen
 */

function getCurrentUser (req, res, next) {
  userService.getUser({ username: req.user.username }, privateFields)
    .then(data => next({ type: 'ReqSuccess', code: 200, data: data }))
    .catch(err => next({ err }))
}


/**
 * @api {put} /me Update the current user
 * @apiName updateCurrentUser
 * @apiGroup User
 * @apiPermission authentificated
 *
 * @apiParam {String} [email] Email of the user
 * @apiParam {String{1..40}} [firstName] First name of the user
 * @apiParam {String{1..40}} [lastName] Last name of the user
 * @apiParam {String} [language] Language preference of the user
 * @apiParam {String{8..100}} [password] Password of the user
 */

function updateCurrentUser (req, res, next) {
  userService.getUser({ username: req.user.username })
    .then(result => {
      if (result) {
        if (req.body.email) {
          userService.getUser({ email: req.body.email })
            .then(result => {
              if (result && result.email == req.user.email || (req.user.username.includes('-go')
                  || req.user.username.includes('-gi') || req.user.username.includes('-42')
                  || req.user.username.includes('-fa'))) {
                delete req.body.email
                userService.updateUser(req.user.username, req.body, 0)
                  .then(data => next({ type: 'UserUpSuccess', code: 200 }))
                  .catch(err => next({ err }))
              } else if (!result) {
                userService.updateUser(req.user.username, req.body, 0)
                  .then(data => next({ type: 'UserUpSuccess', code: 200 }))
                  .catch(err => next({ err }))
              } else next({ type: 'MailAlreadyExist', code: 400 })
            })
            .catch(err => next({ err }))
        } else {
          userService.updateUser(req.user.username, req.body, 0)
            .then(data => next({ type: 'UserUpSuccess', code: 200 }))
            .catch(err => next({ err }))
        }
      } else next({ type: 'InvalidUser', code: 404 })
    })
    .catch(err => next({ err }))
}


/**
 * @api {post} /me/seenMovies Add a movie to the seen movies of the current user
 * @apiName updateSeenMovies
 * @apiGroup User
 * @apiPermission authentificated
 *
 * @apiParam {String} imdbId imdbId of the movie
 */

function updateSeenMovies (req, res, next) {
  movieService.getMovie(req.body.imdbId)
    .then(result => {
      if (result) {
        let movieData = req.body.imdbId
        if (!req.user.seenMovies.find(imdbId => imdbId == movieData)) {
          userService.updateUser(req.user.username, {seenMovies: movieData}, 1)
            .then(data => next({ type: 'UserSeenSuccess', code: 201 }))
            .catch(err => next({ err }))
        } else next({ type: 'UserSeenSuccess', code: 201 })
      } else {
        next({ type: 'InvalidMovieId', code: 400 })
      }
    })
    .catch(err => next({ err }))
}


/**
 * @api {post} /me/currentMovies Add a movie to the current movies of the current user
 * @apiName updateCurrentMovies
 * @apiGroup User
 * @apiPermission authentificated
 *
 * @apiParam {String} imdbId imdbId of the movie
 * @apiParam {Number} timestamp Timestamp when the user stopped watching
 */

function updateCurrentMovies (req, res, next) {
  movieService.getMovie(req.body.imdbId)
    .then(result => {
      if (result) {
        let movieData = {imdbId: req.body.imdbId, timestamp: req.body.timestamp || 0}
        if (req.user.currentMovies.find(movie => movie.imdbId == req.body.imdbId)) {
          let movieIndex = req.user.currentMovies.findIndex(movie => movie.imdbId == req.body.imdbId)
          req.user.currentMovies.splice(movieIndex, 1)
          req.user.currentMovies.push(movieData)
          userService.updateUser(req.user.username, { currentMovies: req.user.currentMovies }, 0)
            .then(data => next({ type: 'UserCurrentUpSuccess', code: 201 }))
            .catch(err => next({ err }))
        } else {
          userService.updateUser(req.user.username, {currentMovies: movieData}, 1)
            .then(data => next({ type: 'UserCurrentSuccess', code: 201 }))
            .catch(err => next({ err }))
        }
      } else {
        next({ type: 'InvalidMovieId', code: 400 })
      }
    })
    .catch(err => next({ err }))
}

/**
 * @api {delete} /me/currentMovies Delete a movie in the current movies of the current user
 * @apiName deleteCurrentMovies
 * @apiGroup User
 * @apiPermission authentificated
 *
 * @apiParam {String} imdbId imdbId of the movie
 */

function deleteCurrentMovie (req, res, next) {
  movieService.getMovie(req.body.imdbId)
    .then(result => {
      if (result && req.user.currentMovies.find(movie => movie.imdbId == req.body.imdbId)) {
        let movieIndex = req.user.currentMovies.findIndex(movie => movie.imdbId == req.body.imdbId)
        req.user.currentMovies.splice(movieIndex, 1)
        userService.updateUser(req.user.username, { currentMovies: req.user.currentMovies }, 0)
          .then(data => next({ type: 'userCurrentDelSuccess', code: 201 }))
          .catch(err => next({ err }))
      } else {
        next({ type: 'InvalidMovieId', code: 400 })
      }
    })
    .catch(err => next({ err }))
}

/**
 * @api {delete} /me/currentMovies Delete a movie in the current movies of the current user
 * @apiName deleteCurrentMovies
 * @apiGroup User
 * @apiPermission authentificated
 *
 * @apiParam {String} imdbId imdbId of the movie
 */

function deleteSeenMovie (req, res, next) {
  movieService.getMovie(req.body.imdbId)
    .then(result => {
      if (result && req.user.seenMovies.find(imdbId => imdbId == req.body.imdbId)) {
        let movieIndex = req.user.seenMovies.findIndex(imdbId => imdbId == req.body.imdbId)
        req.user.seenMovies.splice(movieIndex, 1)
        userService.updateUser(req.user.username, { seenMovies: req.user.seenMovies }, 0)
          .then(data => next({ type: 'UserSeenDelSuccess', code: 201 }))
          .catch(err => next({ err }))
      } else {
        next({ type: 'InvalidMovieId', code: 400 })
      }
    })
    .catch(err => next({ err }))
}

// Export all the functions

module.exports = {
  getUsers,
  postUser,
  getUser,
  getCurrentUser,
  updateCurrentUser,
  updateSeenMovies,
  updateCurrentMovies,
  deleteCurrentMovie,
  deleteSeenMovie
}
