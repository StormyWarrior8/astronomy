import {element} from 'deku'

function render ({ props, children, context, path }) {
  context.theme = context.theme || {}
  return (
    <div class="not-found" hidden={props.hidden} color={context.theme.color}>
      Not Found!
    </div>
  )
}

function onCreate ({ props, dispatch }) {
  dispatch({
    type: 'NOT_FOUND'
  })
}

export default {
  render,
  onCreate
}
