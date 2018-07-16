import * as ActionTypes from './actionTypes'

export default (state, action) => {
  const { type } = action
  switch (type) {
    case ActionTypes.COLLAPSE_MENU:
    console.log(action)
      return { ...state, menuOpen: action.menuOpen }
    default:
      return state
  }
}