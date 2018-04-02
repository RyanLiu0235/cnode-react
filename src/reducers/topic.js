import {
  FETCH_TOPIC_DETAIL,
  COLLECT_TOPIC
} from 'actions/topics'

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
    case COLLECT_TOPIC:
      return Object.assign({}, state, { is_collect: true })
    default:
      return state
  }
}
