
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from 'routes/client-routes'
import serviceClient from 'data/service-client'
import configureStore from 'store/configure-store'

import './scss/index.scss'

const store = configureStore(window.__data)
serviceClient.apiUrl = process.env.APP_API_URL

hydrate(
  <Provider store={store}>
    <Router>
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById('root')
)
