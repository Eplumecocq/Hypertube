'use strict'

// return true if the value is <= the satisfier
module.exports = function maxLength (key, value, display, satisfier) {
  if (value) {
    if (value.constructor === String) {
      if (value.length >= satisfier) {
        return `The ${display} must have a maximum of ${satisfier} character(s).`
      } else {
        return true
      }
    } else {
      return `Invalid format.`
    }
  }
  return `No value found.`
}
