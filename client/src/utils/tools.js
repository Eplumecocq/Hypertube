'use strict'

// Search for a value in array of object
function searchInArrayObj (nameKey, myArray) {
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i].value === nameKey) {
      return myArray[i]
    }
  }
}

module.exports = {
  searchInArrayObj
}
