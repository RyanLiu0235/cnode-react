import {
  delCookie
} from './utils'
const domain = 'https://cnodejs.org/api/v1/'

export const FETCH_USER = 'FETCH_USER'
export const fetchUser = name => dispatch => {
  fetch(`${domain}user/${name}`)
    .then(res => {
      if (res.ok) {
        res.json().then(({
          data
        }) => {
          dispatch({
            type: FETCH_USER,
            data
          })
        })
      }
    })
}

export const FETCH_SELF = 'FETCH_SELF'
export const fetchSelf = name => dispatch => {
  fetch(`${domain}user/${name}`)
    .then(res => {
      if (res.ok) {
        res.json().then(({
          data
        }) => {
          dispatch({
            type: FETCH_SELF,
            data
          })
        })
      }
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
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`${res.status}: ${res.statusText}`)
    }
  })
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