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
    body: {
      accesstoken
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(({
        success,
        loginname
      }) => {
        if (success) {
          return Promise.resolve(loginname)
        } else {
          return Promise.reject()
        }
      })
    }
  })
}