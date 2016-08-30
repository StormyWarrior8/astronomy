import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from './reducers'
const store = createStore(
  reducers.appReducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch(actions.) functions
  // loggerMiddleware // neat middleware that logs actions
  ))
export default store
