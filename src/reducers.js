import {
  FETCH_TOPICS,
  FETCH_MORE_TOPICS,
  FETCH_USER,
  FETCH_SELF,
  LOG_OUT
} from './actions'
import {
  combineReducers
} from 'redux'

function topics(state = {
  page: 1,
  tab: 'all',
  list: []
}, action) {
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

function self(state = {
  recent_topics: [],
  recent_replies: []
}, action) {
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
  topics,
  user,
  self
})

export default reducers