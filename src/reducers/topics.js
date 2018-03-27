import {
  FETCH_TOPICS,
  FETCH_MORE_TOPICS
} from '../actions'

let _state = {
  page: 1,
  tab: 'all',
  list: []
}
export default function topics(state = _state, action) {
  switch (action.type) {
    case FETCH_TOPICS:
      return action.data
    case FETCH_MORE_TOPICS:
      const {
        page,
        tab,
        list
      } = action.data
      return {
        page,
        tab,
        list: [...state.list, ...list]
      }
    default:
      return state
  }
}