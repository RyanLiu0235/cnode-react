import {
  createStore,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index.js'

const finalCreactStore = applyMiddleware(thunk)(createStore)
const store = finalCreactStore(reducer)

export default store