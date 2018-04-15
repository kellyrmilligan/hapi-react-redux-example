import Hapi from 'hapi'
import Inert from 'inert'
import Pino from 'hapi-pino'
import HapiReactRedux from 'hapi-react-redux'
import H2o2 from 'h2o2'

// this is the app, implemented as a plugin!
import App from './plugin'

const server = Hapi.server({
	port: process.env.APP_SERVER_PORT,
	host: process.env.APP_SERVER_HOST
})

const init = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await server.register(HapiReactRedux)
      await server.register({ plugin: H2o2 })
      await server.register(Inert)
      await server.register(App)
    	await server.register({
    		plugin: Pino,
        options: {
          prettyPrint: true,
          logEvents: [
            'response',
            'request-error'
          ]
      	}
      })
      resolve(server)
    } catch (err) {
      reject(err)
    }
  })
}


module.exports = init
