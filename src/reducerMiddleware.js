import moment from 'moment'
import * as actions from './actions'

export const logger = store => next => action => {
  console.log('dispatching', action)
  if(action.type !== 'LOG_EVENT' && action.type){
    var thisTime = new Date()
    thisTime = moment(thisTime)
    var appState = store.getState()
    store.dispatch(actions.logEvent(action, thisTime.format(), appState))
  }
  let result = next(action)
  return result
}
