import {
  FETCH_SELF,
  LOG_OUT
} from '../actions'

let _state = {
  recent_topics: [],
  recent_replies: []
}
export default function self(state = _state, action) {
  switch (action.type) {
    case FETCH_SELF:
      return action.data
    case LOG_OUT:
      return {
        recent_topics: [],
        recent_replies: []
      }
    default:
      return state
  }
}