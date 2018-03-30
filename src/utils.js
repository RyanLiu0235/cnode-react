/**
 * get a certain part of cookies
 * expect: 'a=1; b=2; c=3', 'a'
 * return: 1
 *
 * @param  {String} raw
 * @return {String}
 */
export const getCookie = (raw, key) => {
  let ret
  raw.replace(/(\S+)=(\S+);?/g, (...args) => {
    if (args[1] === key) ret = args[2].replace(/;$/, '')
  })
  return ret
}

/**
 * delete a certain part of cookie
 * expect: 'a=1; b=2; c=3', 'b'
 * return: 'a=1; c=3'
 *
 * @param  {String} raw
 * @param  {String} key
 * @return {Object}
 */
export const delCookie = (raw, key) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var value = getCookie(raw, key)
  return key + "=" + value + ";expires=" + exp.toGMTString()
}

export const formatNumber = raw => (raw).toLocaleString('en-US')
