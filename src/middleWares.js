// middlewares for handling responses
export const handleResponse = res => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.statusText)
  }
}

export const handleError = err => {
  console.error(err)
}
