const IntraStrategy = require('passport-42').Strategy
const configAuth = require('../auth')
const userService = require('../../app/services/user.service')
const pictureHelper = require('../../app/helpers/picture.helper')

module.exports = new IntraStrategy({
  clientID: configAuth.intraAuth.clientID,
  clientSecret: configAuth.intraAuth.clientSecret,
  callbackURL: configAuth.intraAuth.callbackURL
}, function (token, refreshToken, profile, callback) {
  if (profile.emails && profile.emails.constructor === Array &&
      profile.emails.length > 0 && profile.emails[0].value) {
    userService.getUser({ email: profile.emails[0].value })
      .then(user => {
        if (!user) {
          var userData = {
            username: profile.username + '-42',
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            password: 'ceciEstUnMotDePasseIntrouvable987654321'
          }
          pictureHelper.createAdorable(userData.username)
          userService.createUser(userData)
            .then(user => {
              if (!user) return callback(null, false)
              return callback(null, user)
            })
            .catch(err => {
              return callback(err)
            })
        } else {
          return callback(null, user)
        }
      })
      .catch(err => {
        return callback(err)
      })
  } else {
    return callback({ type: 'InvalidEmail', code: 400 })
  }
})
