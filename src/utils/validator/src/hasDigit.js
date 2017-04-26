'use strict'

// return true if the value contains at least one digit
module.exports = function hasDigit (key, value, display, satisfier) {
  const pattern = /([0-9])/g
  if (value) {
    var hasDigit = value.match(pattern) || []
    if (satisfier == 0) {
      if (hasDigit.length == 0)
        return true
      return `Your ${display} must not contain any digit.`
    }
    if (hasDigit.length >= satisfier) return true
    return `Your ${display} must contains at least ${satisfier} digit.`
  }
  return `No value found.`
}
