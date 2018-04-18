import path from 'path'
import fs from 'fs'
import serverRoutes from './routes/server-routes'
import clientRoutes from './routes/client-routes'
import layout from './layout/layout'
import configureStore from './store/configure-store'
import serviceClient from './data/service-client'

const manifest = fs.readFileSync(path.join(__dirname, './public/assets/webpack-client-assets.json'), 'utf8')

module.exports = {
  name: 'App',
  version: '1.0.0',
  register: async function (server, options) {
    const hapiReactReduxOptions = {
      routes: clientRoutes,
      layout: layout,
      config: {
        API_URL: '/api', // the client is going to go through a proxy
      }, // if you want to filter the config down at all, ie some api secret key should only be on server, create a new object or filter it down further
      assets: JSON.parse(manifest),
      configureStore
    }

    server.hapiReactRedux(hapiReactReduxOptions)

    console.log(process.env.EVENTBRITE_API_TOKEN)

    // configure the service client for requests
    serviceClient.apiUrl = `http://${process.env.APP_SERVER_HOST}:${process.env.APP_SERVER_PORT}${process.env.APP_API_URL}`

    server.route(serverRoutes)
  }
}
