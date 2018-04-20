import { combineReducers } from 'redux'
import auth from 'hapi-react-redux/reducers/auth'
import pre from 'hapi-react-redux/reducers/pre'
import config from 'hapi-react-redux/reducers/config'
import serverContext from 'hapi-react-redux/reducers/server-context'

import { reducer as categories } from 'data/categories'
import { reducer as events } from 'data/events'

const app = combineReducers({
  auth,
  pre,
  config,
  serverContext,
  categories,
  events
})

export default app
