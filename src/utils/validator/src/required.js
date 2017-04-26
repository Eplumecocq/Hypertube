'use strict'

// return true if the value  exists
module.exports = function required (key, value, display) {
  if (!value || value.length === 0)
    return `The ${display} is required.`
  return true
}
