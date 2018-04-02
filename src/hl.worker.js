const hljs = require('highlight.js')
const unescape = require('unescape-alltypes-html')

const codeRE = /<code>([\s\S]*?)<\/code>/gm
const handleHighlight = raw => {
  return raw.replace(codeRE, (...args) => {
    const raw = args[1]
    const unescaped = unescape(raw)
    const { value } = hljs.highlight('js', unescaped)
    return `<code>${value}</code>`
  })
}

const linksRE = /(<a href="\/user)/g
const handleAddHash = raw => raw.replace(linksRE, (...args) => `<a href="#/user`)

const handler = raw => handleAddHash(handleHighlight(raw))

onmessage = e => {
  const { content, replies } = e.data
  const _content = handler(content)
  const _replies = replies.map(reply => {
    reply.content = handler(reply.content)
    return reply
  })

  postMessage(Object.assign({}, e.data, {
    content: _content,
    replies: _replies
  }))
}
