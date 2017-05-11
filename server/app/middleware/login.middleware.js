'use strict'

// Middleware to know if the user is logged in
module.exports = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  return next({ type: 'LogRequired', code: 401 })
}
