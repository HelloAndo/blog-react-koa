import { createStore } from 'redux'
import reducer from './reducer'

let menu = {
  menuOpen: true,
  showUserDialog: false
}

const store = createStore(
  reducer, 
  menu, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store