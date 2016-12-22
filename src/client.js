import 'babel-polyfill'
import 'scss/main.scss'
import { applyRouterMiddleware, Router, browserHistory, match } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll'

import serviceClient from 'data/service-client'
import routes from 'routes/client-routes'
import configureStore from 'store/configure-store'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`
const store = configureStore(window.__data)
const history = syncHistoryWithStore(browserHistory, store)

if (module.hot && process.env.NODE_ENV === 'development') {
  document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
    const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
    link.href = nextStyleHref
  })
}

// configure the host for requests
serviceClient.host = store.getState().config.API_URL// this is passed to the client when you configure the plugin

history.listen((location) => {
  // track stuff here
})

match({ routes, location }, (error, redirectLocation, renderProps) => {
  if (error) console.error(error)
  render(
    <Provider store={store}>
      <Router routes={routes} history={history} render={applyRouterMiddleware(useScroll())} />
    </Provider>,
    document.getElementById('react-root'),
    () => {}
  )
})
