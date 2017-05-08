
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from 'routes/client-routes'
import serviceClient from 'data/service-client'
import configureStore from 'store/configure-store'

import './css'

const store = configureStore(window.__data)
serviceClient.apiUrl = store.getState().config.API_URL // this is passed to the client when you configure the plugin

render(
  <Provider store={store}>
    <Router>
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById('root')
)
