import {
  FETCH_USER
} from 'actions/users'

let _state = {
  recent_topics: [],
  recent_replies: []
}
export default function user(state = _state, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.data
    default:
      return state
  }
}