'use strict'

// Call the mongoose package
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User schema definition
const MovieSchema = new Schema({
  imdbId: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Number
  },
  title: {
    type: String
  },
  productionYear: {
    type: Number
  },
  runtime: {
    type: Number
  },
  language: {
    type: String
  },
  rating: {
    type: Number
  },
  genres: [],
  summary: {
    type: String
  },
  torrent: [],
  background: {
    type: String
  },
  imageMedium: {
    type: String
  },
  imageLarge: {
    type: String
  },
  actors: [],
  directors: [],
  producers: [],
  comments: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
})

// Exports the UserSchema for use elsewhere
module.exports = mongoose.model('Movie', MovieSchema)
