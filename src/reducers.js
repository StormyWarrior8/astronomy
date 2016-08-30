import moment from 'moment'

import * as actions from './actions'
import * as thunks from './thunks'

export const initialState = {
  toggled: false,
  fetchingRepos: false,
  didInvalidate: false,
  lastUpdated:null,
  repos : [],
  userActions: [
    {
      type: 'USER_LOADED_PAGE',
      time: moment().format()
    }
  ]
}

export function appReducer (state = initialState, action) {
  switch (action.type) {
    case actions.CLICK_BUTTON:
      return {
        ...state,
        userActions: [
          ...state.userActions,
          {
            time: action.time,
            type: action.type
          }
        ]
      }
    case actions.TOGGLE_BUTTON:
      return {
        ...state,
        toggled: !state.toggled,
        userActions: [
          ...state.userActions,
          {
            time: action.time,
            type: action.type
          }
        ]
      }
    case actions.FETCH_REPOS:
      return {
        ...state,
        fetchingRepos: true,
        userActions: [
          ...state.userActions,
          {
            time: action.time,
            type: action.type
          }
        ]
      }
    case actions.GOT_REPOS:
      return {
        ...state,
        fetchingRepos: false,
        repos: action.repos,
        userActions: [
          ...state.userActions,
          {
            time: action.time,
            type: action.type
          }
        ]
      }
    default:
      return state
  }
}
