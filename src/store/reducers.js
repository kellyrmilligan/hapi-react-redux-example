import { combineReducers } from 'redux'
import auth from 'hapi-react-redux/reducers/auth'
import pre from 'hapi-react-redux/reducers/pre'
import config from 'hapi-react-redux/reducers/config'
import serverContext from 'hapi-react-redux/reducers/server-context'

import categories from 'data/categories'

const app = combineReducers({
  auth,
  pre,
  config,
  serverContext,
  categories
})

export default app
