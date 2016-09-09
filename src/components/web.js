import element from 'virtual-element'
import _ from 'lodash'

import * as thunks from '../thunks'

export default function webContainer (inj) {
  const { store } = inj
  return {
    afterMount ({ state, props }, el, setState) {
      console.log('Web Container loading')
    },
    render({ state, props }, setState) {
      // var data = store.getState()
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
  }
}
