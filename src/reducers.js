import moment from 'moment'

import * as actions from './actions'
import * as thunks from './thunks'

export const initialState = {
  toggled: false,
  fetchingRepos: false,
  didInvalidate: false,
  lastUpdated: null,
  repos: [],
  userActions: [
    {
      type: 'USER_LOADED_PAGE',
      time: moment().format(),
      rawData: {}
    }
  ]
}

export function appReducer (state = initialState, action) {
  switch (action.type) {
    case actions.CLICK_BUTTON:
      return {
        ...state
      }
    case actions.TOGGLE_BUTTON:
      return {
        ...state,
        toggled: !state.toggled
      }
    case actions.FETCH_REPOS:
      return {
        ...state,
        fetchingRepos: true
      }
    case actions.GOT_REPOS:
      return {
        ...state,
        fetchingRepos: false,
        repos: action.repos
      }
    case actions.LOG_EVENT:
      return {
        ...state,
        userActions: [
          ...state.userActions,
          {
            time: action.time,
            type: action.rawData.type,
            rawData: action.rawData,
            appState: action.appState
          }
        ]
      }
    default:
      return state
  }
}
