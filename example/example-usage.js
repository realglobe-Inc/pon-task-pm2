'use strict'

const pon = require('pon')
const ponTaskPm2 = require('pon-task-pm2')

async function tryExample () {
  let run = pon({
    // Define pm2 task
    pm2: ponTaskPm2(),

    // Register shortcuts
    start: 'pm2/start',
    restart: 'pm2/restart',
    stop: 'pm2/stop'
  })

  run('start')
}

tryExample()
