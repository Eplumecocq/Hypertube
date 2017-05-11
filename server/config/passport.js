const local = require('./auth/local')
const User = require('../app/models/user.model')
const facebook = require('./auth/facebook')
const intra = require('./auth/intra')
const google = require('./auth/google')
const github = require('./auth/github')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use(local)
  passport.use(facebook)
  passport.use(intra)
  passport.use(github)
  passport.use(google)
}
