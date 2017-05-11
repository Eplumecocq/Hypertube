'use strict'

const passport = require('passport')
const strategies = ['42', 'facebook', 'google', 'github', 'local']
const userService = require('../services/user.service')
const mailHelper = require('../helpers/mail.helper')
const userHelper = require('../helpers/user.helper')
const bcrypt = require('bcrypt')

// Used to check validity of oauth name
function checkParams (req, res, next) {
  if (req.params.strategy) {
    return strategies.indexOf(req.params.strategy) === -1
    ? next({ type: 'ResourceNotFound', code: 404 })
    : next()
  }
}

// Check if method is local
function isLocal (req, res, next) {
  if (req.params.strategy) {
    return req.params.strategy === 'local'
    ? next()
    : next({ type: 'ResourceNotFound', code: 404 })
  }
}

// Used for login with an array of strategies as param

/**
 * @api {post} /auth/local Login
 * @apiName login
 * @apiGroup Auth
 *
 * @apiParam {String} [username] Username of the account
 * @apiParam {String} [password] Password of the account
 */

function login (req, res, next) {
  var strategy = req.params.strategy || 'local'
  passport.authenticate(strategy, (err, user) => {
    if (err) return next({ err })
    if (!user) return next({ type: 'WrongCred', code: 404 })
    req.login(user, err => {
      (err) ? next({ err })
      : (strategy === 'local')
        ? next({ type: 'LogSuccess', code: 200 })
        : res.status(200).redirect('/')
    })
  })(req, res, next)
}

/**
 * @api {get} /auth/logout Logout from your account
 * @apiName logout
 * @apiGroup Auth
 *
 */

function logout (req, res, next) {
  req.logout()
  return next({ type: 'LogoutSuccess', code: 200 })
}

/**
 * @api {post} /auth/recover Request a new password
 * @apiName recoverPassword
 * @apiGroup Auth
 *
 * @apiParam {String} [email] Email of the account
 */

function recover (req, res, next) {
  userService.getUser({ email: req.body.email })
    .then(result => {
      if (!result) next({ type: 'InvalidEmail', code: 400 })
      else {
        let newPassword = userHelper.generatePassword()
        bcrypt.genSalt(5, function (err, salt) {
          if (err) return next({ err })
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) return next({ err })
            userService.updateUser(result.username, { password: hash }, 0)
              .then(data => mailHelper.sendRecoverMail(result.email, newPassword))
              .catch(err => next({ err }))
            next({ type: 'UserUpSuccess', code: 200 })
          })
        })
      }
    })
    .catch(err => next({ err }))
}

module.exports = {
  login,
  logout,
  checkParams,
  isLocal,
  recover
}
