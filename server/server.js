'use strict'

// ========================================= //
//                BASE SETUP                 //
// ========================================= //

const env = process.env.NODE_ENV

// Const definition
const SERV_PORT = (env === 'dev') ? 8081 : 8080


// Call the packages we need
const compression = require('compression')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const app = express()
const session = require('express-session')
const passport = require('passport')
const router = express.Router()
const formatter = require('./app/middleware/error.middleware')
const cron = require('./app/helpers/movie.helper').cron

// Allow acces from our hypertube website
app.use(cors({ origin: 'http://localhost:8080' }))

// Optimize memory
app.use(compression())

// Connect to mongodb
mongoose.connect(config.DBHost, function dbConnectionErr (err) {
  if (err) console.log('> Database connection error : ', err.message)
  else console.log('> Database connection ok')
})

// Set bluebird as promise
mongoose.Promise = require('bluebird')
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// ========================================= //
//                 APP CONFIG                //
// ========================================= //

// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

// support json encoded bodies
app.use(bodyParser.json())

// ========================================= //
//                 PASSPORT                  //
// ========================================= //

app.use(session({
  secret: 'ceci_est_le_session_secret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// ========================================= //
//                 API ROUTES                //
// ========================================= //

// Access the apidoc from http://localhost:8081/
app.use('/api', express.static('apidoc'))

// Access the pictures fromt http://localhost:8081/
app.use('/pictures/', express.static('./pictures'))

// Static folder vuejs
app.use(express.static(path.join(__dirname, '..', 'client', 'static')))

var favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, '..', 'client', 'static', 'favicon.ico')))

// Call the routes files
const userRoutes = require('./app/routes/user.route')
const authRoutes = require('./app/routes/auth.route')
const oauthRoutes = require('./app/routes/oauth.route')
const movieRoutes = require('./app/routes/movie.route')

router.use('/', userRoutes)
router.use('/', authRoutes)
router.use('/', movieRoutes)

// Prefix all routes with /api
app.use('/api', router)

// Add non-api routes, oauth
app.use('/', oauthRoutes)

// Use build to render front
if (env === 'prod') {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))
}

// Call error middleware
app.use(formatter)

// Call cron
// cron('30 * * * * *', 6000)
// cron('00 * 18 * * *', 2629800000)

// ========================================= //
//             START THE SERVER              //
// ========================================= //

app.listen(SERV_PORT, function () {
  var startServer = `> Hypertube API listening on ` +
                    `http://localhost:${SERV_PORT}`
  console.log(startServer)
})

// Export for unit tests
module.exports = app
