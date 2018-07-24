import * as ActionTypes from './actionTypes'

export default (state, action) => {
  const { type } = action
  switch (type) {

    // 侧边栏折叠状态
    case ActionTypes.COLLAPSE_MENU:
      return { ...state, menuOpen: action.menuOpen }

    // 用户dialog开启/关闭
    case ActionTypes.HANDLE_USER_DIALOG:
      return { ...state, showUserDialog: action.showUserDialog }

    default:
      return state

  }
}