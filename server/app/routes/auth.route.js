'use strict'

const router = require('express').Router()
const joiValidator = require('../middleware/joi.middleware')


// Import our user controller

const authCtrl = require('../controllers/auth.controller')

// Call the controller

router.route('/auth/logout')
    .get(authCtrl.logout)

// Route for the oauth and the local auth

router.route('/auth/local')
    .post(authCtrl.login)

router.route('/auth/recover')
    .post(joiValidator, authCtrl.recover)

module.exports = router
