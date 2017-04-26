'use strict'

const streamHelper = require('../helpers/stream.helper')
const subsHelper = require('../helpers/subs.helper')

/**
 * @api {get} /movies/:imdbId/stream/ Request a movie stream
 * @apiName getMovieStream
 * @apiGroup Movie
 * @apiPermission admin
 *
 * @apiParam {String} [imdbId] ImdbId of the movie
 * @apiParam {String} [quality] Stream quality (720p, 1080p)
 * 
 * @apiSuccess (Success : 200) {Stream} Movie stream
 */

function stream (req, res, next) {
  streamHelper.setMagnet(req, res, next, function () {
    streamHelper.startEngine(req, res, next)
    streamHelper.setStatsHandler()
  })
}

/**
 * @api {get} /movies/:imdbId/subtitles/ Request a movie subtitles
 * @apiName getMovieSubtitle
 * @apiGroup Movie
 * @apiPermission admin
 *
 * @apiParam {String} [imdbId] ImdbId of the movie
 * @apiParam {String} [language] Language of the subtitles
 * 
 * @apiSuccess (Success : 200) {Stream} Subtitles stream
 */

function streamSubs (req, res, next) {
  subsHelper.startStream(req, res, next)
}

module.exports = {
  stream,
  streamSubs
}
