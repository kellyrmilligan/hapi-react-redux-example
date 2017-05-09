import Hapi from 'hapi'
import Hoek from 'hoek'
import Good from 'good'
import fs from 'fs'
import path from 'path'

import 'scss/main.scss'

module.exports = function (done) {

  const options = {
    debug: {
      log: [
        'error',
        'connection',
        'client'
      ],
      request: [
        'error'
      ]
    }
  }

  const server = new Hapi.Server(options)

  const webpackAssets = fs.readFileSync(path.join(__dirname, './webpack-assets.json'), 'utf8')

  console.log(webpackAssets)

  server.connection({
    port: process.env.SERVER_PORT
  })

  server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
  }, (err) => {
    done(err, server)
  })

}
