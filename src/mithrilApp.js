import * as view from './view'
import * as controller from './controller'

export default function app (opts) {
  var results = {
    controller: controller.appController(opts),
    view: view.appView(opts)
  }
  console.log(results)
  return results
}
