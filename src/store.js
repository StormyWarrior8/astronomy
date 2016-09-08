import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers'
import * as middleware from './reducerMiddleware'

const reduxStore = createStore(
  reducers.appReducer,
  // compose(
    applyMiddleware(
      middleware.logger,
      thunkMiddleware // lets us dispatch(actions.) functions
      // loggerMiddleware // neat middleware that logs actions
    ))
    // ,window.devToolsExtension ? window.devToolsExtension() : f => f
  // )
export default reduxStore
