'use strict'

const srt2vtt = require('srt-to-vtt')
const fs = require('fs')
const https = require('https')
const movieService = require('../services/movie.service')
const request = require('request')
const OS = require('opensubtitles-api')
const openSubs = new OS({
  useragent: 'OSTestUserAgentTemp',
  username: 'hyperteam',
  password: 'Hypertube2017',
  ssl: true
})
const subsPath = '/tmp/hypertube_edp/subtitles'

function startStream (req, res, next) {
  let imdbId = req.params.imdbId || ''
  let language = req.query.language || ''
  let langCode = getLangCode(language)
  if (langCode) {
    movieService.getMovie(imdbId)
      .then(result => {
        if (result) {
          openSubs.search({
            sublanguageid: langCode,
            imdbid: imdbId,
            extensions: ['srt']
          }).then(sub => {
            if (Object.keys(sub).length !== 0) {
              let subObj = sub[getShortLangCode(langCode)]
              let filename = `${imdbId}.${langCode}.srt`
              if (subObj) {
                res.writeHead(206, {'Content-Type': 'text/vtt'})
                if (!fs.existsSync(subsPath)) fs.mkdirSync(subsPath)
                download(subObj.url, `${subsPath}/${filename}`, function () {
                  fs.createReadStream(`${subsPath}/${filename}`)
                    .pipe(srt2vtt())
                    .pipe(res)
                })
              }
            }
          }).catch(err => {
            console.log('> Subtitles:', err)
            next({err})
          })
        } else
        next({ type: 'InvalidMovieId', code: 404 })
      })
  }
}

function download (url, dest, cb) {
  let file = fs.createWriteStream(dest)
  return https.get(url, response => {
    response.pipe(file)
    file.on('finish', () => file.close(cb))
  })
}

function getLangCode (language = '') {
  const langCode = {
    'english': 'eng',
    'french': 'fre',
    'spanish': 'spa',
    'german': 'ger',
    'portuguese': 'por',
    'italian': 'ita'
  }
  return (language in langCode) ? langCode[language] : false
}

function getShortLangCode (langCode = '') {
  const shortLangCode = {
    'eng': 'en',
    'fre': 'fr',
    'spa': 'es',
    'ger': 'de',
    'por': 'pt',
    'ita': 'it'
  }
  return (langCode in shortLangCode) ? shortLangCode[langCode] : false
}

module.exports = {
  startStream
}
