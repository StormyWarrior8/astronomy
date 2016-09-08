import element from 'virtual-element'
import { tree, render } from 'deku'
import { connect, storePlugin } from 'deku-redux'
import { Router, Route, Redirect } from '@segment/deku-enroute';
import store from 'store'
import _ from 'lodash'


// store
console.log('store')
import reduxStore from './store'
import * as thunks from './thunks'
console.log(reduxStore)
window.store = reduxStore

const Loader = connect(mapStateToProps, mapDispatchToProps)({
  render({ props }) {
    const { isLoading, children } = props
    return isLoading ? <p>loading...</p> : <div>{children}</div>
  }
})
const App = connect(mapStateToProps, mapDispatchToProps)({
  afterMount ({ state, props }, el, setState) {
    console.log('App Container loading')
    reduxStore.dispatch(thunks.fetchReposThunk()).then(() => {
      console.log('fetched repos')
    })
  },
  render({ state, props }, setState) {
    // var data = reduxStore.getState()
    return(
      <section class="astronomy">
        <nav class="navbar navbar-light bg-faded">
          <div class="navbar-brand">
            <img src="telescope.svg" alt="telescope" />
            Astronomy
          </div>
          <ul class="nav navbar-nav">
            <li class="nav-item"><a class="nav-link" href="/list">list</a></li>
            <li class="nav-item"><a class="nav-link" href="/cards">cards</a></li>
            <li class="nav-item"><a class="nav-link" href="/web">web</a></li>
          </ul>
        </nav>
        <div class="content-box">
          {props.children}
        </div>
      </section>
    )
  }
})
const List = connect(mapStateToProps, mapDispatchToProps)({
  afterMount ({ state, props }, el, setState) {
    console.log('List Container loading')
  },
  render({ state, props }, setState) {
    // var data = reduxStore.getState()
    // console.log(data.repos)
    console.log(state,props)
    const { repos } = props
    const repoitems = _.map(repos, function(repo){
      const tags = _.map(repo.tags, function(tag){
        return(
          <li class="tag">{tag}</li>
        )
      })
      return(
        <li class="repo">
          <img src={repo.owner.avatar_url} width="25" alt={repo.owner.login} />
          <span class="title">{repo.name}</span>
          <span class="lang">{repo.language}</span>
          <span class="forks">
            <i class="fa fa-code-fork"></i>
            {repo.forks_count}
          </span>
          <span class="stars">
            <i class="fa fa-star-o"></i>
            {repo.stargazers_count}
          </span>
          <a href={repo.html_url} class="repo" target="_blank">{repo.full_name}</a>
          <a href={repo.owner.html_url} class="owner" target="_blank">{repo.owner.login}</a>
          <ul class="tags">{tags}</ul>
        </li>
      )
    })
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <ul class="repos">
              {repoitems}
            </ul>
          </div>
          <div class="col-sm-3">
            <h4>Tags</h4>
          </div>
        </div>
      </div>
    )
  }
})
const Cards = connect(mapStateToProps, mapDispatchToProps)({
  afterMount ({ state, props }, el, setState) {
    console.log('Cards Container loading')
  },
  render({ state, props }, setState) {
    // var data = reduxStore.getState()
    return (
      <ul>
      </ul>
    )
  }
})

const Web = connect(mapStateToProps, mapDispatchToProps)({
  afterMount ({ state, props }, el, setState) {
    console.log('Web Container loading')
  },
  render({ state, props }, setState) {
    // var data = reduxStore.getState()
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

app.use(storePlugin(reduxStore));


// Define a state-less component
render(app, document.body)
/**
 * Redux reduxStore.
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
