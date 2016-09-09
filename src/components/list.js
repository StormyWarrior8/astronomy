import element from 'virtual-element'
import _ from 'lodash'
import dotty from 'dotty'

import * as thunks from '../thunks'

export default function listContainer (inj) {
  const { store, utils } = inj
  const repoFieldNames = utils.dict.objectDefinitions.repo
  return {
    afterMount ({ state, props }, el, setState) {
      console.log('List Container loading')
    },
    render({ state, props }, setState) {
      // var data = store.getState()
      // console.log(data.repos)
      console.log(state,props)
      const { repos } = props
      const displayColumns = props.ui.list.displayColumns
      const thead = _.map(displayColumns, column => {
        return (
          <th>{repoFieldNames[column]}</th>
        )
      })
      const repoitems = _.map(repos, repo => {
        const tags = _.map(repo.tags, tag => {
          return(
            <li class="tag">{tag}</li>
          )
        })
        const cells = _.map(displayColumns, column => {
          if(column === 'tags') {
            return (
              <td class={column}>
                <ul class="tags">{tags}</ul>
              </td>
            )
          }
          if(column === 'owner.avatar_url'){
            return (
              <td class={column}>
                <img src={repo.owner.avatar_url} width="25" alt={repo.owner.login} />
              </td>
            )
          }
          if(column === 'name'){
            return (
              <td class={column}>
                <a target="_blank" href={repo.html_url}>
                  {repo.name}
                </a>
              </td>
            )
          }
          if(column === 'owner.login'){
            return (
              <td class={column}>
                <a target="_blank" href={repo.owner.html_url}>
                  {repo.owner.login}
                </a>
              </td>
            )
          }
          if(column.indexOf('html_url')>-1){
            return (
              <td class={column}>
                <a target="_blank" href={dotty.get(repo, column)}>
                  {dotty.get(repo, column).split('://')[1]}
                </a>
              </td>
            )
          }
          return (
            <td class={column}>{dotty.get(repo, column)}</td>
          )
        })
        return(
          <tr class="repo">
            {cells}
          </tr>
        )
      })
      return (
        <div class="container">
          <div class="row">
            <div class="col-sm-9">
              <table class="table repo-table">
                <thead>
                  <tr>
                    {thead}
                  </tr>
                </thead>
                <tbody>
                  {repoitems}
                </tbody>
              </table>
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
