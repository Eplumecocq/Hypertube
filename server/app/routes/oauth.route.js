'use strict'

const router = require('express').Router()

// Import our auth controller

const authCtrl = require('../controllers/auth.controller')

// Call the controller

router.param('strategy', authCtrl.checkParams)

// Route for the oauth and the local auth

router.route('/oauth/:strategy')
    .get(authCtrl.login)

router.route('/oauth/:strategy/callback')
    .get(authCtrl.login)

module.exports = router
