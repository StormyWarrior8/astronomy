import m from 'mithril'
import _ from 'lodash'
import moment from 'moment'

import * as actions from './actions'
import * as thunks from './thunks'

export function appView ({store}) {
  return ctrl => {
    var data = store.getState()
    return m('div', [
      m('nav.navbar.navbar-light.bg-faded', [
        m('.navbar-brand', [
          m('img', {
            src: 'telescope.svg'
          }),
          'Astronomy'
        ]),
        m('ul.nav.navbar-nav', [
          m('li.nav-item.active', [
            m('a.nav-link', {href: '#'}, 'list')
          ])
        ]),
        m('form.form-inline.pull-right', [
          m('input.form-control', {type: 'text',placeholder: 'Github Access Token'})
        ])
      ]),
      m('ul.repos', _.map(data.repos, repo => {
        console.log(repo)
        return m('li.repo', [
          m('img', {src: repo.owner.avatar_url, width: 25}),
          m('span.title', repo.name),
          m('span.lang', repo.language),
          m('span.forks', [
            m('i.fa.fa-code-fork'),
            repo.forks_count
          ]),
          m('span.stars', [
            m('i.fa.fa-star-o'),
            repo.stargazers_count
          ]),
          m('a.repo', {href: repo.html_url}, repo.full_name),
          m('a.owner', {href: repo.owner.html_url}, repo.owner.login),

          m('ul.tags', _.map(repo.tags, tag=>{
            return m('li.tag',tag)
          }))
        ])
      }))
    ])
  }
}
