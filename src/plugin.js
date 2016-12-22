import Hoek from 'hoek'
import serverRoutes from 'routes/server-routes'
import clientRoutes from 'routes/client-routes'
import layout from 'layout/layout'
import configureStore from 'store/configure-store'
import serviceClient from 'data/service-client'
import webpackAssets from './webpack-assets'

function after (server, next) {
  server.register([
  ], (err) => {
    Hoek.assert(!err, err)
    // conigure hapiReactRedux
    const options = {
      routes: clientRoutes,
      layout: layout,
      config: {
        API_URL: process.env.API_URL
      }, // if you want to filter the config down at all, ie some api secret key should only be on server, create a new object or filter it down further
      assets: webpackAssets,
      configureStore
    }

    server.hapiReactRedux(options)

    // configure teh service client for requests
    serviceClient.host = process.env.API_URL

    server.route(serverRoutes)
    return next()
  })
}

function exampleApp (server, options, next) {
  server.dependency([
    'hapi-react-redux'
  ], after)

  return next()
}

exampleApp.attributes = {
  name: 'exampleApp'
}

module.exports = {
  register: exampleApp
}
