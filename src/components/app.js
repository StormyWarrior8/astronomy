import {element} from 'deku'

function render ({ props, children, context, path }) {
  context.theme = context.theme || {}
  return (
    <div class="App" hidden={props.hidden} color={context.theme.color}>
      {children}
    </div>
  )
}

function onCreate ({ props, dispatch }) {
  dispatch({
    type: 'APP_STARTED'
  })
}

function onRemove ({ props, dispatch }) {
  dispatch({
    type: 'APP_STOPPED'
  })
}

export default {
  render,
  onCreate,
  onRemove
}
