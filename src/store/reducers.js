import { combineReducers } from 'redux'
import isAppFetching from 'react-redux-transition-manager/redux/is-app-fetching'
import addresses from 'data/addresses/addresses'
import forgotPassword from 'data/auth/forgot-password'
import resetPassword from 'data/auth/reset-password'
import auth from 'hapi-react-redux/reducers/auth'
import pre from 'hapi-react-redux/reducers/pre'
import config from 'hapi-react-redux/reducers/config'
import serverContext from 'hapi-react-redux/reducers/server-context'
import { routerReducer } from 'react-router-redux'

const app = combineReducers({
  addresses,
  forgotPassword,
  resetPassword,
  isAppFetching,
  routing: routerReducer,
  auth,
  pre,
  config,
  serverContext
})

export default app
