import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from 'store/reducers'
import serviceClient from 'data/service-client'

export default function (preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunk.withExtraArgument(serviceClient)
    )
  )
}
