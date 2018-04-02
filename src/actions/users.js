import {
  delCookie
} from '@/utils'
import { handleResponse, handleError } from '@/middleWares'
import { domain } from '@/constants'

const _fetchUser = (name, dispatch, mutation) => {
  fetch(`${domain}user/${name}`)
    .then(handleResponse)
    .then(({ data }) => {
      dispatch({
        type: mutation,
        data
      })
    }).catch(handleError)
}

export const FETCH_USER = 'FETCH_USER'
export const fetchUser = name => dispatch => {
  _fetchUser(name, dispatch, FETCH_USER)
}

export const FETCH_SELF = 'FETCH_SELF'
export const fetchSelf = name => dispatch => {
  _fetchUser(name, dispatch, FETCH_SELF)
}

export const REGISTER_ACCESSTOKEN = 'REGISTER_ACCESSTOKEN'
export const registerAccesstoken = accesstoken => dispatch => {
  dispatch({
    type: REGISTER_ACCESSTOKEN,
    data: accesstoken
  })
}

export const login = accesstoken => dispatch => {
  return fetch(`${domain}accesstoken`, {
      method: 'POST',
      body: JSON.stringify({
        accesstoken
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleResponse)
    .then(res => {
      dispatch({
        type: REGISTER_ACCESSTOKEN,
        data: accesstoken
      })
      return Promise.resolve(res)
    }, err => Promise.reject(err))
}

export const LOG_OUT = 'LOG_OUT'
export const logout = () => dispatch => {
  return new Promise(resolve => {
    // 清除本地数据
    dispatch({
      type: LOG_OUT
    })
    // 清除cookie
    const cookie = delCookie(document.cookie, 'cnode')
    document.cookie = cookie
    resolve()
  })
}
