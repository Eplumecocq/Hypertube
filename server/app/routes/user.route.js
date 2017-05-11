'use strict'

const router = require('express').Router()
const userHelper = require('../helpers/user.helper')
const picture = require('../helpers/picture.helper')
// Import our user controller
const userCtrl = require('../controllers/user.controller')
const isLogged = require('../middleware/login.middleware')
const joiValidator = require('../middleware/joi.middleware')

// Call the controllers

router.route('/users')
    .get(userCtrl.getUsers)
    .post(joiValidator, userHelper.hashPassword, userCtrl.postUser)

router.route('/users/:username')
    .get(joiValidator, userCtrl.getUser)

router.route('/me')
    .get(isLogged, userCtrl.getCurrentUser)
    .put(isLogged,
        picture.upload().single('avatar'),
        picture.checkUpload,
        joiValidator,
        userHelper.hashPassword,
        userCtrl.updateCurrentUser)

router.route('/me/currentmovies')
    .post(isLogged, joiValidator, userCtrl.updateCurrentMovies)
    .delete(isLogged, joiValidator, userCtrl.deleteCurrentMovie)

router.route('/me/seenmovies')
    .post(isLogged, joiValidator, userCtrl.updateSeenMovies)
    .delete(isLogged, joiValidator, userCtrl.deleteSeenMovie)

module.exports = router
