import {
  REGISTER_ACCESSTOKEN
} from 'actions/users'

export default function accesstoken(state = 0, action) {
  switch (action.type) {
    case REGISTER_ACCESSTOKEN:
      return action.data
    default:
      return state
  }
}
