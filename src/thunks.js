import request from 'superagent'
import moment from 'moment'

import * as actions from './actions'
import * as thunks from './thunks'

export function fetchReposThunk () {
  return dispatch => {
    dispatch(actions.fetchRepos(moment().format()))
    return new Promise((resolve, reject)=>{
      request('http://localhost:9998/user/stars').then(results=>{
        console.log(results)
        dispatch(actions.gotRepos(results.body, moment().format()))
        resolve(results)
      }).catch(reject)
    })
  }
}
