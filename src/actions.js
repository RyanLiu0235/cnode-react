import superagent from 'superagent'

const domain = 'https://cnodejs.org/api/v1/'

export const FETCH_USER = 'FETCH_USER'
export const fetchUser = name => (dispatch, getState) => {
  superagent
    .get(`${domain}user/${name}`)
    .end(function(err, data) {
      dispatch({
        type: FETCH_USER,
        data: data.body.data
      })
    })
}

export const login = accesstoken => (dispatch, getState) => {
  return new Promise(resolve => {
    superagent
      .post(`${domain}accesstoken`)
      .send({
        accesstoken
      })
      .end(function(err, data) {
        resolve(data.body.loginname)
      })
  })
}