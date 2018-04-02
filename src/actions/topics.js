import Worker from '@/hl.worker.js'
import { handleResponse, handleError } from '@/middleWares'
import { domain } from '@/constants'

export const COLLECT_TOPIC = 'COLLECT_TOPIC'
export const collectTopic = ({ accesstoken, topic_id }) => dispatch => {
  return fetch(`${domain}topic_collect/collect`, {
      method: 'POST',
      body: JSON.stringify({ accesstoken, topic_id }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(handleResponse)
    .then(res => {
      if (res.success) {
        dispatch({
          type: COLLECT_TOPIC
        })
      }
    })
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
