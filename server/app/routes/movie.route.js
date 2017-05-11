'use strict'

const router = require('express').Router()

// Import our user controller

const movieCtrl = require('../controllers/movie.controller')
const streamCtrl = require('../controllers/stream.controller')
const isLogged = require('../middleware/login.middleware')
const joiValidator = require('../middleware/joi.middleware')

// const scrapperCtrl = require('../controllers/scrapper.controller')

// Call the controllers

router.route('/movies')
    .get(isLogged, joiValidator, movieCtrl.getMovies)
router.route('/movies/:imdbId')
    .get(isLogged, joiValidator, movieCtrl.getMovie)
router.route('/movies/:imdbId/comment')
    .post(isLogged, joiValidator, movieCtrl.createComment)
router.route('/movies/:imdbId/subtitles')
    .get(isLogged, joiValidator, streamCtrl.streamSubs)
router.route('/movies/:imdbId/stream/')
    .get(isLogged, joiValidator, streamCtrl.stream)

// router.route('/scrap')
//     .get(scrapperCtrl.getYTSPageNumber
//         .bind(null, scrapperCtrl.doScrapping))



module.exports = router
