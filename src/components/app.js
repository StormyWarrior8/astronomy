import element from 'virtual-element'

import * as thunks from '../thunks'

export default function appContainer (inj) {
  const { store } = inj
  return {
    afterMount({ state, props }, el, setState) {
      console.log('App Container loading')
      store.dispatch(thunks.fetchReposThunk()).then(() => {
        console.log('fetched repos')
      })
    },
    render({ state, props }, setState) {
      // var data = store.getState()
      return (
        <section class='astronomy'>
          <nav class='navbar navbar-light bg-faded'>
            <div class='navbar-brand'>
              <img src='telescope.svg' alt='telescope' /> Astronomy
            </div>
            <ul class='nav navbar-nav'>
              <li class='nav-item'>
                <a class='nav-link' href='/list'>list</a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/cards'>cards</a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/web'>web</a>
              </li>
            </ul>
          </nav>
          <div class='content-box'>
            {props.children}
          </div>
        </section>
      )
    }
  }
}
