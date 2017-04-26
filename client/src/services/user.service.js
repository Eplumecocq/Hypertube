'use strict'

const axios = require('axios')
const apiUrl = '/api'

function getUser (username) {
  return axios.get(apiUrl + `/users/${username}`)
}

function postUser (user = {}) {
  return axios.post(apiUrl + '/users', user)
}

function getCurrentUser () {
  return axios.get(apiUrl + '/me')
}

function putCurrentUser (user = {}) {
  var userData = {}
  for (var index in user) {
    if (user[index] !== '') userData[index] = user[index]
  }
  return axios.put(apiUrl + '/me', userData)
}

function postLog (user = {}) {
  return axios.post(apiUrl + '/auth/local', user)
}

function getAdorableAvatar (username = '') {
  return axios.get(`https://api.adorable.io/avatars/${username}.png`)
}

function logout () {
  return axios.get(apiUrl + '/auth/logout')
}

function recoverPassword (email) {
  return axios.post(apiUrl + '/auth/recover', { email: email })
}

module.exports = {
  getUser,
  postUser,
  getCurrentUser,
  putCurrentUser,
  postLog,
  getAdorableAvatar,
  logout,
  recoverPassword
}
