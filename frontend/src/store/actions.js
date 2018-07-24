import * as ActionTypes from './actionTypes'

export const collapseMenu = open => {
  console.log('----', ActionTypes.COLLAPSE_MENU)
  return {
    type: ActionTypes['COLLAPSE_MENU'],
    menuOpen: open
  }
}

export const handleUserDialog = bool => {
  return {
    type: ActionTypes['HANDLE_USER_DIALOG'],
    showUserDialog: bool
  }
}