import {
  delCookie
} from './utils'
import unescape from 'unescape-alltypes-html'
import hljs from 'highlight.js'
const domain = 'https://cnodejs.org/api/v1/'
// const hljs = require('highlight.js')

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
export const fetchTopicDetail = ({
  id
}) => dispatch => {
  fetch(`${domain}topic/${id}`)
    .then(handleResponse)
    .then(({ data }) => {
      const codeRE = /<code>([\s\S]*?)<\/code>/gm
      data.content = data.content.replace(codeRE, (...args) => {
        const raw = args[1]
        const unescaped = unescape(raw)
        const { value } = hljs.highlight('javascript', unescaped)
        return `<code>${value}</code>`
      })
      dispatch({
        type: FETCH_TOPIC_DETAIL,
        data
      })
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
