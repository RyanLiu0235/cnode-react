import {
  FETCH_USER
} from './actions';
import {
  combineReducers
} from 'redux';

function user(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.data
    default:
      return state
  }
}

const reducers = combineReducers({
  user
})

export default reducers