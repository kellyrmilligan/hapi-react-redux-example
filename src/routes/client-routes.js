import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import Home from 'routes/home/Home.js'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
  </Route>
)

export default routes
