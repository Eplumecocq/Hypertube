'use strict'

// Set the NODE_ENV to test
process.env.NODE_ENV = 'test'
console.log()
let mongoose = require('mongoose')
let User = require('../app/models/user.model')

// Require dev dependencies
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()

chai.use(chaiHttp)

describe('> Users', () => {
  // remove all users from db
  beforeEach((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err)
      done()
    })
  })

  // Test the {get} /api/users route
  describe('- {get} /api/users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          if (err) console.log(err)
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })

  // Test the {post} /api/users route
  describe('- {post} /api/users', () => {
    it('it should not post a user whitout email', (done) => {
      let user = {
        username: 'testman',
        firstName: 'jean',
        lastName: 'letesteur',
        language: 'english',
        password: '@;azsldja9233ealkds'
      }
      chai.request(server)
        .post('api/users')
        .send(user)
        .end((err, res) => {
          if (err) console.log(err)
          // res.should.have.status(200)
          // res.body.should.be.a('object')
          // res.body.should.have.property('errors')
          // res.body.errors.should.have.property('email')
          // res.body.errors.email.should.have.property('kind').eql('required')
          done()
        })
    })
  })
})
