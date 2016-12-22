import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import Home from 'routes/home/Home.js'
import Stargazers from 'routes/stargazers/Stargazers.js'

function testAffect (nextState, replace, callback) {
  setTimeout(() => {
    callback()
  }, 4000)
}

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/repos/:owner/:repo/stargazers' onEnter={testAffect} component={Stargazers} />
  </Route>
)

export default routes
