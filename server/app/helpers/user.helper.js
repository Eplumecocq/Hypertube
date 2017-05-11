'use strict'

const bcrypt = require('bcrypt')
const randomString = require('randomstring')

function hashPassword (req, res, next) {
  if (req.body.password) {
    bcrypt.genSalt(5, function (err, salt) {
      if (err) return next({ err })
      // hash the password using our new salt
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return next({ err })
        // override the cleartext password with the hashed one
        req.body.password = hash
        next()
      })
    })
  } else next()
}

function generatePassword () {
  let uppercaseMinCount = 1
  let numberMinCount = 2
  let password = ''

  function isStrongEnough (password) {
    let upperCase = password.match(/([A-Z])/g)
    let numberMin = password.match(/([\d])/g)
    return upperCase && upperCase.length >= uppercaseMinCount &&
          numberMin && numberMin.length >= numberMinCount
  }

  while (!isStrongEnough(password)) {
    password = randomString.generate({
      length: 10,
      charset: 'alphanumeric'
    })
  }
  return password
}

module.exports = {
  hashPassword,
  generatePassword
}
