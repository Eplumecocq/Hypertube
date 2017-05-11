'use strict'

const CronJob = require('cron').CronJob
const movieService = require('../services/movie.service')
const rimraf = require('rimraf')
const fs = require('fs')
const path = require('path')

function getAllFolders (callback) {
  return callback(fs.readdirSync('/tmp/hypertube_edp/')
    .filter(file => fs.statSync(path.join('/tmp/hypertube_edp/', file)).isDirectory()))
}

function cron (delay, time) {
  let job = new CronJob(delay, function () {
    console.log('\n--- CRON SCANING ---')
    getAllFolders(function (data) {
      for (let i = 0; i < data.length; i++) {
        let newTitle = data[i].split('(')[0].trim().toLowerCase()
        movieService.getMovieByTitle(newTitle)
          .then(res => {
            if (res && res.timestamp && new Date().getTime() - time >= res.timestamp) {
              console.log('deleting : ' + newTitle)
              rimraf(`/tmp/hypertube_edp/${data[i]}`, function (err) {
                if (err) console.log(err)
              })
            }
          })
      }
    })
  }, function (err) {
    console.log(err)
  }, true)
}

module.exports = {
  cron
}
