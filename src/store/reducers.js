import { combineReducers } from 'redux'
import isAppFetching from 'react-redux-transition-manager/redux/is-app-fetching'
import auth from 'hapi-react-redux/reducers/auth'
import pre from 'hapi-react-redux/reducers/pre'
import config from 'hapi-react-redux/reducers/config'
import serverContext from 'hapi-react-redux/reducers/server-context'
import { routerReducer } from 'react-router-redux'

import orgRepos from 'data/org-repos'
import stargazers from 'data/stargazers'

const app = combineReducers({
  isAppFetching,
  routing: routerReducer,
  auth,
  pre,
  config,
  serverContext,
  orgRepos,
  stargazers
})

export default app
