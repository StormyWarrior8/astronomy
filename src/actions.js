export const CLICK_BUTTON = 'CLICK_BUTTON'

export function clickButton (time) {
  return {
    type: CLICK_BUTTON,
    time
  }
}

export const TOGGLE_BUTTON = 'TOGGLE_BUTTON'

export function toggleButton (time) {
  return {
    type: TOGGLE_BUTTON,
    time
  }
}

export const FETCH_REPOS = 'FETCH_REPOS'

export function fetchRepos (time) {
  return {
    type: FETCH_REPOS,
    time
  }
}

export const GOT_REPOS = 'GOT_REPOS'

export function gotRepos (repos, time) {
  return {
    type: GOT_REPOS,
    time,
    repos
  }
}

export const LOG_EVENT = 'LOG_EVENT'

export function logEvent (event, time) {
  return {
    type: LOG_EVENT,
    rawData: event,
    time
  }
}
