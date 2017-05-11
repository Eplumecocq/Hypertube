'use strict'

const movieService = require('../services/movie.service')

module.exports = function (req, res, next) {
  let hash = req.params.magnet || ''
  let validHash = /([A-Z0-9]+)/
  let isValid = validHash.test(hash)
  if (isValid) {
    movieService.getMovieByHash(hash)
      .then(res => {
        if (!res) return next({ type: 'ResourceNotFound', code: 404 })
        return next()
      })
  } else return next({ type: 'InvalidMagnetHash', code: 401 })
}
