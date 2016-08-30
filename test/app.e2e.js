var Nightmare = require('nightmare')
var expect = require('chai').expect // jshint ignore:line

/* global describe, it, beforeEach, afterEach */

var nightmare

describe('E2E: test local installation of astronomy', function () {
  this.timeout(10000)
  beforeEach(function (done) {
    nightmare = new Nightmare()
    done()
  })
  afterEach(function (done) {
    nightmare.end()
    nightmare.proc.disconnect()
    nightmare.proc.kill()
    nightmare.ended = true
    nightmare = null
    done()
  })
  it('should find the application', function (done) {
    nightmare
      .goto('http://localhost:9999')
      .wait(500)
      .click('.toggle')
      .wait(500)
      .evaluate(function () {
        return document.querySelector('.toggle').innerHTML
      })
      .then(function (text) {
        expect(text).to.equal('Toggle me! on')
        done()
      })
      .catch(done)
  })
})
