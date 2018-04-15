import dotenv from 'dotenv'
import cluster from 'cluster'
import initServer from './server'

dotenv.config()

async function startServer () {
  try {
    const server = await initServer()
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)

    process.on('unhandledRejection', (err) => {
    	console.log(err)
    	process.exit(1)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

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
