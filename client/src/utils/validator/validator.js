'use strict'
const required = require('./src/required')
const minLength = require('./src/minLength')
const maxLength = require('./src/maxLength')
const specialChars = require('./src/specialChars')
const emailRegexp = require('./src/emailRegexp')
const hasDigit = require('./src/hasDigit')
const hasCaps = require('./src/hasCaps')

const inputToCheck = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20,
    specialChars: false
  },
  email: {
    required: true,
    emailRegexp: true
  },
  firstName: {
    required: true,
    minLength: 1,
    maxLength: 40,
    specialChars: false,
    hasDigit: 0
  },
  lastName: {
    required: true,
    minLength: 1,
    maxLength: 40,
    specialChars: false,
    hasDigit: 0
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 100,
    hasCaps: true,
    hasDigit: 1,
    specialChars: false
  }
}

const rulesFunc = {
  required: required,
  minLength: minLength,
  maxLength: maxLength,
  specialChars: specialChars,
  emailRegexp: emailRegexp,
  hasCaps: hasCaps,
  hasDigit: hasDigit
}

// Check all input rules
function validate (inputName, inputDisplay, inputValue) {
  for (var index in inputToCheck) {
    if (index == inputName) {
      return getFirst(checkInput(inputToCheck[index], inputName, inputDisplay, inputValue))
    }
  }
  return false
}

// Check one input rule
function checkInput (inputRules, inputName, inputDisplay, inputValue) {
  let res = {}
  for (var rule in inputRules) {
    res[rule] = rulesFunc[rule](inputName, inputValue, inputDisplay.toLowerCase(), inputRules[rule])
  }
  return res
}

// Get the first value of an object
function getFirst (obj = {}) {
  let size = Object.keys(obj).length
  if (size > 0) {
    for (let curr in obj) {
      if (obj[curr] !== true) return obj[curr]
    }
  }
  return false
}

export default {
  validate: validate
}
