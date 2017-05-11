'use strict'

// Call the mongoose package
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

// User schema definition
const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    min: 1,
    max: 40
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    min: 1,
    max: 40
  },
  password: {
    type: String,
    trim: true,
    default: ''
  },
  language: {
    type: String,
    trim: true,
    required: true,
    default: 'english'
  },
  seenMovies: [],
  currentMovies: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
})

// Method to verify password
UserSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

// Exports the UserSchema for use elsewhere
module.exports = mongoose.model('User', UserSchema, 'users')
