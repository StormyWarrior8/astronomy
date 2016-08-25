import m from 'mithril'
import _ from 'lodash'
import { createStore } from 'redux'
import moment from 'moment'
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

// reducers

const initialState = {
  toggled: false,
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
    default:
      return state
  }
}

// store

const store = createStore(testApp, initialState)

// end redux logic block
const app = {
  controller: () => {
    return {}
  },
  view: ctrl => {
    var data = store.getState()
    return m('div', [
      m('button', {
        onclick: event => {
          store.dispatch(clickButton(moment().format()))
        }
      }, 'Click me!'),
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
      ])
    ])
  }
}

m.mount(document.body, app)
