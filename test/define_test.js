/**
 * Test case for define.
 * Runs with mocha.
 */
'use strict'

const define = require('../lib/define.js')
const ponContext = require('pon-context')
const {ok} = require('assert')
const asleep = require('asleep')

describe('define', function () {
  this.timeout(300000)

  before(async () => {

  })

  after(async () => {

  })

  it('Define', async () => {
    const ctx = ponContext()
    const task = define(
      require.resolve('../misc/mocks/mock-script-01.js')
    )
    ok(task)

    const {start, stop, restart, show, del, logs} = task

    await del(ctx).catch((err) => null)

    await start(ctx)
    await asleep(1000)
    await show(ctx)
    await start(ctx)
    await restart(ctx)
    await stop(ctx)
    await stop(ctx) // Does not throw even if already stopped
    await del(ctx)
  })

  it('Define with pon', async () => {
    if (process.env.CI) {
      return
    }

    const here = process.cwd()
    const projectDir = `${__dirname}/../misc/mocks/mock-project01`
    process.chdir(projectDir)
    const ctx = ponContext({
      cwd: projectDir
    })
    const task = define.pon(
      'foo',
      {
        name: 'pon-task-pm2-test-foo'
      }
    )
    ok(task)

    const {start, stop, restart, show, del, logs} = task

    await del(ctx).catch((err) => null)

    await start(ctx)
    await asleep(1000)
    await show(ctx)
    await restart(ctx)
    await stop(ctx)
    await del(ctx)

    process.chdir(here)
  })
})

/* global describe, before, after, it */
