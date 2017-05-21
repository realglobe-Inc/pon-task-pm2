'use strict'

const pon = require('pon')
const ponTaskPm2 = require('pon-task-pm2')

async function tryExample () {
  let run = pon({
    pm2: ponTaskPm2(),
    start: 'pm2/start',
    restart: 'pm2/restart',
    stop: 'pm2/stop'
  })

  run('myTask01')
}

tryExample()
