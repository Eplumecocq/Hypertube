'use strict'

// return true if the value matches the pattern
// RFC5322 friendly
module.exports = function emailRegexp (key, value, display) {
  const pattern = '^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$'
  if (value) {
    var validEmail = value.match(pattern)
    if (validEmail === null)
      return `The ${display} seems to have a wrong format.`
    return true
  } else {
    return `No value found.`
  }
}
