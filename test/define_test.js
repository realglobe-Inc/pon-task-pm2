/**
 * Test case for define.
 * Runs with mocha.
 */
'use strict'

const define = require('../lib/define.js')
const ponContext = require('pon-context')
const { ok } = require('assert')
const asleep = require('asleep')
const co = require('co')

describe('define', function () {
  this.timeout(300000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Define', () => co(function * () {
    let ctx = ponContext()
    let task = define(
      require.resolve('../misc/mocks/mock-script-01.js'),
      { instances: 1 }
    )
    ok(task)

    let { start, stop, restart, show, del, logs } = task

    yield start(ctx)
    yield asleep(1000)
    yield show(ctx)
    yield restart(ctx)
    yield stop(ctx)
    yield del(ctx)
  }))
})

/* global describe, before, after, it */
