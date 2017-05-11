'use strict'

const axios = require('axios')
const apiUrl = '/api'

function getMovies (query) {
  return (query)
  ? axios.get(apiUrl + `/movies?` + query)
  : axios.get(apiUrl + `/movies`)
}

function getMovie (id) {
  return axios.get(apiUrl + `/movies/${id}`)
}

function updateCurrentMovies (imdbId, timeStamp) {
  return axios.post(apiUrl + `/me/currentmovies`, { imdbId: imdbId, timestamp: timeStamp })
}

function createComment (comment, id) {
  return axios.post(apiUrl + `/movies/${id}/comment`, { comment: comment })
}

function deleteCurrentMovies (imdbId) {
  return axios.delete(apiUrl + '/me/currentmovies', { data: { imdbId: imdbId } })
}

function updateSeenMovies (imdbId) {
  return axios.post(apiUrl + '/me/seenMovies', { imdbId: imdbId })
}

function deleteSeenMovies (imdbId) {
  return axios.delete(apiUrl + '/me/seenMovies', { data: { imdbId: imdbId } })
}

module.exports = {
  getMovies,
  getMovie,
  updateCurrentMovies,
  createComment,
  deleteCurrentMovies,
  updateSeenMovies,
  deleteSeenMovies
}
