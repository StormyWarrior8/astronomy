import m from 'mithril'

// store
console.log('store')
import store from './store'
console.log(store)
window.store = store

// end redux logic block

import app from './mithrilApp'
console.log(app)
var App = app({store})
console.log(App)
m.mount(document.body, App)
