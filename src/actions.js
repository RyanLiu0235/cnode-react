import {
  delCookie
} from './utils'
import Worker from './hl.worker.js'

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
    .then(({ data }) => {
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
export const fetchTopics = ({ tab, page }) => dispatch => {
  _fetchTopics(page, tab, FETCH_TOPICS, dispatch)
}

export const FETCH_MORE_TOPICS = 'FETCH_MORE_TOPICS'
export const fetchMoreTopics = ({ tab, page }) => dispatch => {
  _fetchTopics(page, tab, FETCH_MORE_TOPICS, dispatch)
}

export const RESET_PAGE = 'RESET_PAGE'
export const resetPage = () => dispatch => {
  dispatch({
    type: RESET_PAGE
  })
}

export const FETCH_TOPIC_DETAIL = 'FETCH_TOPIC_DETAIL'
export const fetchTopicDetail = ({ id, accesstoken }) => dispatch => {
  fetch(`${domain}topic/${id}/?accesstoken=${accesstoken}`)
    .then(handleResponse)
    .then(({ data }) => {
      // dispatch first for pre-rendering
      dispatch({
        type: FETCH_TOPIC_DETAIL,
        data
      })

      // highlight code and re-render
      const _data = Object.assign({}, data)
      const worker = new Worker()
      worker.onmessage = e => {
        _data.content = e.data
        dispatch({
          type: FETCH_TOPIC_DETAIL,
          data: _data
        })
      }
      worker.postMessage({ content: data.content })
    })
}

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
