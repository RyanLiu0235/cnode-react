import {
  FETCH_TOPIC_DETAIL
} from 'actions'

let _state = {
  replies: [],
  title: '',
  author: '',
  create_at: 0,
  reply_count: 0,
  visit_count: 0,
  content: ''
}
export default function topic(state = _state, action) {
  switch (action.type) {
    case FETCH_TOPIC_DETAIL:
      return action.data
    default:
      return state
  }
}