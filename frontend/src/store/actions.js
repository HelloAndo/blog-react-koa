import * as ActionTypes from './actionTypes'

export const collapseMenu = open => {
  console.log('----', ActionTypes.COLLAPSE_MENU)
  return {
    type: ActionTypes['COLLAPSE_MENU'],
    menuOpen: open
  }
}

