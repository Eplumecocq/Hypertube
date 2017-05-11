'use strict'

// Import movie model

const MovieSchema = require('../models/movie.model')
const shortFields = { actors: 1, producers: 1, directors: 1, title: 1, productionYear: 1, rating: 1, summary: 1,
                      imageMedium: 1, genres: 1, imdbId: 1,
                      mmr: { $add: [{ $multiply: ['$productionYear', 0.3] },
                           { $multiply: ['$rating', 0.7] }] }}

/**
 * List all movies
 * @returns {Promise} The find promise
 */

function listMovies (query) {
  let finalQuery = [
    { $project: shortFields },
    { $sort: { [query.order]: query.axis, _id: 1 } },
    { $match: { $and: [
      { productionYear: { $gte: query.date[0], $lte: query.date[1] } },
      { rating: { $gte: query.rating[0], $lte: query.rating[1] } } ]}},
    { $skip: query.offset - 1 },
    { $limit: query.limit }]
  if (query.q)
    finalQuery[2].$match.$and.push(
      { [query.search]: { $regex: RegExp(query.q, 'i') } })
  if (query.genres && query.genres.length > 0 && query.genres[0] != '') {
    finalQuery[2].$match.$and.push(
      { genres: { $all: query.genres } })
  }
  return MovieSchema
    .aggregate(finalQuery)
    .exec()
}

/**
 * Create a movie
 * @param {Object} movieData - Object with all movie informations
 * @returns {Promise} The save promise
 */

function createMovie (movieData) {
  let newMovie = new MovieSchema(movieData)
  return newMovie
    .save()
}

/**
 * Get a movie info
 * @param {String} imdbId - imdbId of the movie
 * @returns {Promise} The findOne promise
 */

function getMovie (imdbId) {
  return MovieSchema
    .findOne({ imdbId: imdbId })
    .lean()
}

function updateTime (imdbId) {
  return MovieSchema
    .update({ imdbId: imdbId },
            { $set: { timestamp: new Date().getTime() } })
}

/**
 * Create a movie
 * @param {String} imdbId - imdbId of the movie
 * @param {Object} commentData - Object with userId and comment message
 * @returns {Promise} The save promise
 */

function createComment (comment, username, imdbId) {
  return MovieSchema
    .update({ imdbId: imdbId },
            { $push: { comments: { comment: comment, username: username } } })
}

function getMovieByTitle (title) {
  let reg = new RegExp(title, 'i')
  return MovieSchema
    .findOne({ title: reg })
}

// Export all the Services functions

module.exports = {
  createComment,
  createMovie,
  listMovies,
  getMovie,
  getMovieByTitle,
  updateTime
}
