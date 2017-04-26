'use strict'

// Import user model

const UserSchema = require('../models/user.model')


/**
 * List all Users
 * @returns {Promise} The find promise
 */

function listUsers (fields) {
  return UserSchema
    .find()
    .select(fields)
    .lean()
}


/**
 * Get a user info
 * @param {String} username - Username of the user
 * @returns {Promise} The findOne promise
 */

function getUser (searchObj, fields) {
  return UserSchema
    .findOne(searchObj)
    .select(fields)
    .lean()
}

/**
 * Create a user
 * @param {Object} userData - Object with all user informations
 * @returns {Promise} The save promise
 */

function createUser (userData) {
  let newUser = new UserSchema(userData)
  return newUser.save()
}


/**
 * Update a user
 * @param {String} username - Username of the user
 * @param {Object} userData - Object with all user informations updated
 * @returns {Promise} The update promise
 */

function updateUser (username, userData, push) {
  return (push === 1)
  ? UserSchema
      .update({ username: username },
              { $push: userData })
  : UserSchema
      .update({ username: username },
            { $set: userData })
}

// Export all the services functions

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser
}
