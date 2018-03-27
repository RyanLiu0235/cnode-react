import {
  delCookie
} from './utils'
const domain = 'https://cnodejs.org/api/v1/'

// middlewares for handling responses
const handleResponse = res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.statusText)
  }
}

const handleError = err => {
  console.error(err)
}

const _fetchTopics = (page, tab, mutation, dispatch) => {
  fetch(`${domain}topics?page=${page}&tab=${tab}`)
    .then(handleResponse)
    .then(({
      data
    }) => {
      dispatch({
        type: mutation,
        data: {
          list: data,
          page: page + 1,
          tab
        }
      })
    }).catch(handleError)
}

export const FETCH_TOPICS = 'FETCH_TOPICS'
export const fetchTopics = ({
  tab,
  page
}) => dispatch => {
  _fetchTopics(page, tab, FETCH_TOPICS, dispatch)
}

export const FETCH_MORE_TOPICS = 'FETCH_MORE_TOPICS'
export const fetchMoreTopics = ({
  tab,
  page
}) => dispatch => {
  _fetchTopics(page, tab, FETCH_MORE_TOPICS, dispatch)
}

export const FETCH_USER = 'FETCH_USER'
export const fetchUser = name => dispatch => {
  fetch(`${domain}user/${name}`)
    .then(handleResponse)
    .then(({
      data
    }) => {
      dispatch({
        type: FETCH_USER,
        data
      })
    }).catch(handleError)
}

export const FETCH_SELF = 'FETCH_SELF'
export const fetchSelf = name => dispatch => {
  fetch(`${domain}user/${name}`)
    .then(handleResponse)
    .then(({
      data
    }) => {
      dispatch({
        type: FETCH_SELF,
        data
      })
    }).catch(handleError)
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
  }).then(handleResponse)
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