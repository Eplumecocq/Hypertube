'use strict'

// return true if the value contains at least one Uppercase
module.exports = function hasCaps (key, value, display) {
  const pattern = /[A-Z]/g
  if (value) {
    var hasCaps = value.match(pattern)
    if (hasCaps === null)
      return `Your ${display} must contains at least one capital letter.`
    return true
  } else {
    return `No value found.`
  }
}
