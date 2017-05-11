const request = require('request')
const multer = require('multer')
const fs = require('fs')
const baseURL = 'https://api.adorable.io/avatars/285/'
const mmm = require('mmmagic')
const Magic = mmm.Magic

function createAdorable (username) {
  request(baseURL + username + '.png', { encoding: 'binary' },
    function (err, res, body) {
      if (!err) {
        fs.writeFile('./pictures/' + username, body, 'binary',
          function (err) {
            if (!err) console.log('saved')
            else console.log(err)
          })
      } else {
        console.log(err)
      }
    })
}

function upload () {
  // Where to store the file
  const storage = multer.diskStorage({
    destination: './tmp',
    filename: function (req, file, cb) {
      cb(null, req.user.username)
    }
  })

  // File size
  const fileSize = {
    fileSize: 5 * 1024 * 1024
  }
  return multer({
    storage: storage,
    limits: fileSize
  })
}

function checkUpload (req, res, next) {
  if (req.file == undefined) next()
  else {
    var magic = new Magic(mmm.MAGIC_MIME_TYPE)
    magic.detectFile(req.file.path, function (err, result) {
      if (err) next({ err })
      else if (result == 'image/jpeg' || result == 'image/png') {
        fs.rename(req.file.path, './pictures/' + req.file.filename,
          (err) => (err) ? next({ err }) : next())
      } else {
        fs.unlink(req.file.path, function (err) {
          if (err) next({ err })
        })
        next({ type: 'InvalidFileFormat', code: 510 })
      }
    })
  }
}

module.exports = {
  createAdorable,
  upload,
  checkUpload
}
