const Hoek = require('hoek')
const cluster = require('cluster')
const server = require('../server')

function startServer () {
  server((err, server) => {
    Hoek.assert(!err, err)
    server.start((err) => {
      Hoek.assert(!err, err)
      server.log('info', `Server running at: ${server.info.uri}`)
    })
  })
}

if (process.env.NODE_ENV !== 'development') {
  if (cluster.isMaster) {
    const numWorkers = require('os').cpus().length
    console.log(`Master cluster setting up ${numWorkers} workers...`)

    for (let i = 0; i < numWorkers; i++) {
      cluster.fork()
    }

    cluster.on('online', function (worker) {
      console.log(`Worker ${worker.process.pid} is online`)
    })

    cluster.on('exit', function (worker, code, signal) {
      console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`)
      console.log('Starting a new worker')
      cluster.fork()
    })
  } else {
    startServer()
  }
} else {
  startServer()
}
