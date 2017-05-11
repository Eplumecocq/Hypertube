const GithubStrategy = require('passport-github').Strategy
const configAuth = require('../auth')
const userService = require('../../app/services/user.service')
const pictureHelper = require('../../app/helpers/picture.helper')

module.exports = new GithubStrategy({
  clientID: configAuth.githubAuth.clientID,
  clientSecret: configAuth.githubAuth.clientSecret,
  callbackURL: configAuth.githubAuth.callbackURL,
  scope: ['user:name', 'user:email']
}, function (token, refreshToken, profile, callback) {
  if (profile.emails && profile.emails.constructor === Array &&
      profile.emails.length > 0 && profile.emails[0].value) {
    let email = profile.emails.find(obj => obj.primary).value
    userService.getUser({ email: email })
      .then(user => {
        if (!user && profile && profile.username && profile._json.name &&
            profile._json.name.split(' ').length > 0 && profile.id) {
          var userData = {
            username: profile.username + '-gi',
            email: email,
            firstName: profile._json.name.split(' ')[0],
            lastName: profile._json.name.split(' ')[1] || 'Doe',
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
        console.log('err', err)
        return callback(err)
      })
  } else {
    return callback({ type: 'InvalidEmail', code: 400 })
  }
})
