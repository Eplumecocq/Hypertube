'use strict'

// Format is : TYPE_OF_ERROR: MESSAGE
const errors = {
  WrongCred: 'Wrong username or password',
  LogRequired: 'You need to log in to access this ressource',
  ResourceNotFound: 'Resource was not found on the server',
  InvalidEmail: 'The email is not accessible for some reason',
  InvalidUser: 'The provided user doesn\'t appear to exist',
  InvalidMovieId: 'The provided id of the movie doesn\'t appear to exist',
  MailAlreadyExist: 'This email already exist',
  UsernameAlreadyExist: 'This username already exist',
  InvalidFileFormat: 'This file extension isn\'t allowed',
  InvalidMagnetHash: 'This hash format is invalid',
  StreamNoFilesFound: 'No files found in stream engine',
  StreamNoQualityFound: 'This quality doesn\'t exist for this movie'
}

// Format is : TYPE_OF_SUCCESS: MESSAGE
const success = {
  UserCreateSuccess: 'User successfully created',
  LogSuccess: 'Succesfully logged in',
  LogoutSuccess: 'Successfully logged out',
  ReqSuccess: 'Request succesfully executed',
  UserUpSuccess: 'User succesfully updated',
  UserSeenSuccess: 'Movie succesfully added to the seen movies',
  UserCurrentSuccess: 'Movie succesfully added to the current movies',
  UserSeenUpSuccess: 'Movie succesfully updated in the seen movies',
  UserCurrentUpSuccess: 'Movie succesfully updated in the current movies',
  UserSeenDelSuccess: 'Movie succesfully deleted from the seen movies',
  userCurrentDelSuccess: 'Movie succesfully deleted from the current movie'
}

// Export the middleware to be used in server.js

module.exports = function (result, req, res, next) {
  if ('err' in result && 'isJoi' in result.err) {
    return res.status(200).json({
      error: {
        message: result.err.details[0].message.replace(/"/g, ""),
        type: result.err.name,
        code: 400
      }
    })
  }
  // Error from outside of our project (mongo, oauth)
  if ('err' in result) {
    if (result.err.code && result.err.code === 11000 && result.err.name) {
      result.err.name = 'DuplicateKey'
      result.err.message = errors['MongoInvalid']
    }
    return res.status(200).json({
      error: {
        type: result.err.name,
        code: result.err.status || result.err.code,
        message: result.err.message
      }
    })
  }

  // Error and success from our code
  if (result && result.code && result.code >= 300) {
    return res.status(200).json({
      error: {
        type: result.type,
        message: errors[result.type],
        code: result.code
      }
    })
  } else if (result && result.code && result.type) {
    return res.status(200).json({
      meta: {
        type: result.type,
        message: success[result.type],
        code: result.code
      },
      data: result.data || []
    })
  }

  console.log(result)
  // Server error, not planned
  return res.status(200).json({
    error: {
      message: 'Unknown error',
      type: 'UnknownError',
      code: 404
    }
  })
}
