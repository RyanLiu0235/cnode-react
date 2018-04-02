import {
  FETCH_TOPIC_DETAIL,
  COLLECT_TOPIC,
  LIKE_REPLY
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
    case LIKE_REPLY:
      const copy = Object.assign({}, state)
      const reply = copy.replies.find(item => item.id === action.id)
      if (reply) {
        if (action.action === 'up') {
          reply.is_uped = true
          reply.ups.push(action.id)
        } else {
          reply.is_uped = false
          reply.ups.splice(reply.ups.indexOf(action.id))
        }
      }
      return copy
    default:
      return state
  }
}
