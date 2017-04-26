'use strict'

const movieService = require('../services/movie.service')
const torrentStream = require('torrent-stream')
let engine = ''
let magnet = ''
const storageOptions = {
  tmp: '/tmp/hypertube_edp/tmp', // torrent files folder
  path: '/tmp/hypertube_edp' // movie files folder
}
const info = {
  progress: 0,
  length: 0,
  downloadSpeed: 0,
  ratio: 0
}

function setMagnet (req, res, next, cb) {
  movieService.getMovie(req.params.imdbId)
    .then(result => {
      if (result) {
        let quality = req.query.quality
        let hash = ''
        for (let i in result.torrent) {
          if (result.torrent[i].quality === quality) hash = result.torrent[i].hash
        }
        if (!hash) return next({ type: 'StreamNoQualityFound', code: 404 })
        magnet = `magnet:?xt=urn:btih:${hash}`
        console.log('> Magnet set to:', magnet)
        engine = torrentStream(magnet, storageOptions)
        console.log('> Engine created')
        cb()
      } else
        next({ type: 'InvalidMovieId', code: 404 })
    })
}

function removeMagnet () {
  engine.remove(magnet)
}

function startEngine (req, res, next) {
  engine.on('ready', function () {
    console.log('> Engine ready')
    if (!engine.files || !engine.files.length)
      return next({ type: 'StreamNoFilesFound', code: 404 })
    let file = engine.files.reduce((fileA, fileB) => fileA.length > fileB.length ? fileA : fileB)
    console.log('> Filename:', file.name)
    info.length = file.length
    let range = req.headers.range || 'bytes=0-'
    console.log('> Range:', range)
    let positions = range.replace(/bytes=/, '').split('-')
    let start = parseInt(positions[0], 10)
    let fileSize = file.length
    let end = positions[1] ? parseInt(positions[1], 10) : fileSize - 1
    let chunksize = (end - start) + 1
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    })
    let streamPosition = {
      start: start,
      end: end
    }
    file.createReadStream(streamPosition).pipe(res)
  })
}

function setStatsHandler () {
  engine.on('download', function () {
    let currentProgress = Math.round(engine.swarm.downloaded / info.length * 100)
    if (info.percentage != currentProgress)
      console.log('> File info',
                  '| downloaded: ', info.downloaded,
                  ', length:', formatBytes(info.length),
                  ', percentage:', info.percentage,
                  ', downloadSpeed:', info.downloadSpeed,
                  ', seeders:', engine.swarm.wires.length)
    info.downloaded = formatBytes(engine.swarm.downloaded)
    info.percentage = currentProgress
    info.downloadSpeed = formatBytes(engine.swarm.downloadSpeed(), 0)
  })
}

function formatBytes (bytes, decimals) {
  if (bytes == 0) return '0 Byte'
  let k = 1024
  let dm = decimals + 1 || 3
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

module.exports = {
  setMagnet,
  removeMagnet,
  startEngine,
  setStatsHandler
}
