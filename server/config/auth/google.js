const GoogleStrategy = require('passport-google-oauth20').Strategy
const configAuth = require('../auth')
const userService = require('../../app/services/user.service')
const pictureHelper = require('../../app/helpers/picture.helper')

module.exports = new GoogleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL,
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email']
}, function (token, refreshToken, profile, callback) {
  if (profile.emails && profile.emails.constructor === Array &&
      profile.emails.length > 0 && profile.emails[0].value) {
    userService.getUser({ email: profile.emails[0].value })
      .then(user => {
        if (!user && profile && profile.emails && profile.emails.length > 0 &&
          profile.name.givenName && profile.name.familyName &&
          profile.id) {
          var userData = {
            username: profile.name.givenName + profile.name.familyName + '-go',
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            language: 'english',
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
