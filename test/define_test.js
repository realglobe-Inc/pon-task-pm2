/**
 * Test case for define.
 * Runs with mocha.
 */
'use strict'

const define = require('../lib/define.js')
const ponContext = require('pon-context')
const { ok } = require('assert')
const asleep = require('asleep')

describe('define', function () {
  this.timeout(300000)

  before(async () => {

  })

  after(async () => {

  })

  it('Define', async () => {
    let ctx = ponContext()
    let task = define(
      require.resolve('../misc/mocks/mock-script-01.js'),
      { instances: 1 }
    )
    ok(task)

    let { start, stop, restart, show, del, logs } = task

    await start(ctx)
    await asleep(1000)
    await show(ctx)
    await restart(ctx)
    await stop(ctx)
    await del(ctx)
  })
})

/* global describe, before, after, it */
