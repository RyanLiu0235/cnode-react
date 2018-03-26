import {
  FETCH_USER,
  FETCH_SELF
} from './actions';
import {
  combineReducers
} from 'redux';

function self(state = {
  recent_topics: [],
  recent_replies: []
}, action) {
  switch (action.type) {
    case FETCH_SELF:
      return action.data
    default:
      return state
  }
}

function user(state = {
  recent_topics: [],
  recent_replies: []
}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.data
    default:
      return state
  }
}

const reducers = combineReducers({
  user,
  self
})

export default reducers