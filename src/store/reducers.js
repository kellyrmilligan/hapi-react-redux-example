import { combineReducers } from 'redux'
import auth from 'hapi-react-redux/reducers/auth'
import pre from 'hapi-react-redux/reducers/pre'
import config from 'hapi-react-redux/reducers/config'
import serverContext from 'hapi-react-redux/reducers/server-context'

import orgRepos from 'data/org-repos'
import stargazers from 'data/stargazers'

const app = combineReducers({
  auth,
  pre,
  config,
  serverContext,
  orgRepos,
  stargazers
})

export default app
