import {
  combineReducers
} from 'redux'

import self from './self'
import user from './user'
import topic from './topic'
import topics from './topics'

const reducers = combineReducers({
  topic,
  topics,
  user,
  self
})

export default reducers