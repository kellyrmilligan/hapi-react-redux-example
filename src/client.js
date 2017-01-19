import 'babel-polyfill'
import './css'
import { applyRouterMiddleware, Router, browserHistory, match } from 'react-router'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'react-router-scroll/lib/useScroll'
import NProgress from 'nprogress'

import serviceClient from 'data/service-client'
import routes from 'routes/client-routes'
import configureStore from 'store/configure-store'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`
const store = configureStore(window.__data)
const history = syncHistoryWithStore(browserHistory, store)

// set up nprogress
NProgress.configure({ showSpinner: false })

// configure the host for requests
serviceClient.apiUrl = store.getState().config.API_URL// this is passed to the client when you configure the plugin

history.listen((location) => {
  // track stuff here
})

function shouldUpdateScroll (prevRouterProps, currentRouterProps) {
  return true
}

match({ routes, location }, (error, redirectLocation, renderProps) => {
  if (error) console.error(error)
  render(
    <Provider store={store}>
      <Router routes={routes} history={history} render={applyRouterMiddleware(useScroll(shouldUpdateScroll))} />
    </Provider>,
    document.getElementById('react-root'),
    () => {}
  )
})
