import element from 'virtual-element'
import { tree, render } from 'deku'
import { connect, storePlugin } from 'deku-redux'
import { Router, Route, Redirect } from '@segment/deku-enroute';
import _ from 'lodash'

import dictionary from './dict'
const dict = dictionary('en')

const utils = {
  dict
}

// store
console.log('store')
import store from './store'
import * as thunks from './thunks'
console.log(store)
window.store = store

const Loader = connect(mapStateToProps, mapDispatchToProps)({
  render({ props }) {
    const { isLoading, children } = props
    return isLoading ? <p>loading...</p> : <div>{children}</div>
  }
})

const injection = {
  store,
  utils
}

import appContainer from './components/app'
const App = connect(mapStateToProps, mapDispatchToProps)(appContainer(injection))

import listContainer from './components/list'
const List = connect(mapStateToProps, mapDispatchToProps)(listContainer(injection))
import cardsContainer from './components/cards'
const Cards = connect(mapStateToProps, mapDispatchToProps)(cardsContainer(injection))

const Web = connect(mapStateToProps, mapDispatchToProps)({
  afterMount ({ state, props }, el, setState) {
    console.log('Web Container loading')
  },
  render({ state, props }, setState) {
    // var data = store.getState()
    return (
      <ul></ul>
    )
  }
})


const NotFound = connect(mapStateToProps, mapDispatchToProps)({
  render({ state }) {
    return (
      <div class="NotFound">
        <h1>404 / not found</h1>
        <a href="/">app</a>
      </div>
    )
  }
})


const app = tree(
  <Router location={window.location.pathname}>
    <Route path="/" component={App}>
      <Route path="list" component={List} />
      <Route path="cards" component={Cards} />
      <Route path="web" component={Web} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
)

app.use(storePlugin(store));


// Define a state-less component
render(app, document.body)
/**
 * Redux store.
 */


 /**
  * State -> props.
  */

 function mapStateToProps(state, ownProps) {
  //  const { application, audiencesByWorkspaceSlug } = state;
   //
  //  const {
  //    isRequesting: loading = true,
  //    data: audiences = []
  //  } = audiencesByWorkspaceSlug[ownProps.params.workspaceSlug] || {};
   //
  //  const { filter } = application.audiences;

   return state;
 }

 /**
  * Dispatch -> props.
  */

 function mapDispatchToProps(dispatch) {
   return {
    //  fetchAudiences: (workspaceSlug) => dispatch(listAudiences({ workspaceSlug })),
    //  filterAudiences: (filter) => dispatch(filterAudiences(filter))
   }
 }
