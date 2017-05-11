'use strict'


// return true if the value contains a special char (!@#$$%^&()-+={}[]|\/?.><`~'"*)
module.exports = function specialChars (key, value, display) {
  const pattern = /^[\w-]*$/
  if (value) {
    if (value.constructor !== String)
      return `Invalid format.`
    var speChars = value.match(pattern)
    if (speChars === null)
      return `The ${display} contains a forbidden character.`
    return true
  } else {
    return `No value found.`
  }
}
