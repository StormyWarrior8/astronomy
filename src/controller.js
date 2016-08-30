import * as thunks from './thunks'
import m from 'mithril'

export function appController ({store}) {
  console.log('setting up controller')
  return () => {
    store.dispatch(thunks.fetchReposThunk()).then(() => {
      m.redraw(true)
    })
    return {}
  }
}
