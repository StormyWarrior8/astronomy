import m from 'mithril'
import * as thunks from './thunks'

export function appController ({store}) {
  console.log('setting up controller')
  return () => {
    store.dispatch(thunks.fetchReposThunk()).then(() => {
      m.redraw(true)
    })
    return {}
  }
}
