import m from 'mithril'
import _ from 'lodash'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import moment from 'moment'
import request from 'superagent'
// redux logic block

// actions

const CLICK_BUTTON = 'CLICK_BUTTON'

function clickButton (time) {
  return {
    type: CLICK_BUTTON,
    time
  }
}

const TOGGLE_BUTTON = 'TOGGLE_BUTTON'

function toggleButton (time) {
  return {
    type: TOGGLE_BUTTON,
    time
  }
}

const FETCH_REPOS = 'FETCH_REPOS'

function fetchRepos (time) {
  return {
    type: FETCH_REPOS,
    time
  }
}

const GOT_REPOS = 'GOT_REPOS'

function gotRepos (repos, time) {
  return {
    type: GOT_REPOS,
    time,
    repos
  }
}
// reducers

const initialState = {
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

function testApp (state = initialState, action) {
  switch (action.type) {
    case CLICK_BUTTON:
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
    case TOGGLE_BUTTON:
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
    case FETCH_REPOS:
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
    case GOT_REPOS:
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

// thunks


const fetchReposThunk = () => {
  return dispatch => {
    dispatch(fetchRepos(moment().format()))
    return new Promise((resolve, reject)=>{
      request('http://localhost:9998/repos').then(results=>{
        console.log(results)
        dispatch(gotRepos(results.body, moment().format()))
        resolve(results)
      }).catch(reject)
    })
  }
}

// store

const store = createStore(
  testApp,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  ))

// end redux logic block

const app = {
  controller: () => {
    return {}
  },
  view: ctrl => {
    var data = store.getState()
    return m('div', [
      m('button', {
        style: 'background-color:#00f;color:white;',
        onclick: event => {
          store.dispatch(clickButton(moment().format()))
        }
      }, 'Click me yo!'),
      m('button', {
        style: 'background-color:#00f;color:white;',
        onclick: event => {
          store.dispatch(fetchReposThunk()).then(()=>{
            m.redraw(true)
          })
        }
      }, 'Fetch repos'),
      m('button', {
        onclick: event => {
          store.dispatch(toggleButton(moment().format()))
        },
        style: [
          'color:white;background-color:',
          data.toggled ? '#0a0' : '#a00',
          ';'
        ].join('')
      }, ['Toggle me! ', data.toggled ? 'on' : 'off']),
      m('br'),
      m('pre', [
        m('code', _.map(data.userActions, action => {
          return [
            action.time,
            '=>',
            action.type,
            '\n'
          ].join(' ')
        }))
      ]),
      m('ul',_.map(data.repos, repo => {
        console.log(repo)
        return m('li', [
          repo.full_name,
          '=>',
          m('img',{src:repo.owner.avatar_url, width:25})
        ])
      }))

    ])
  }
}

m.mount(document.body, app)
