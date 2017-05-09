import Hapi from 'hapi'
import Hoek from 'hoek'
import Good from 'good'

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
  console.log(process.env)
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
