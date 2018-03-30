const hljs = require('highlight.js')
const unescape = require('unescape-alltypes-html')

onmessage = e => {
  const { content } = e.data
  const codeRE = /<code>([\s\S]*?)<\/code>/gm
  const highlighted = content.replace(codeRE, (...args) => {
    const raw = args[1]
    const unescaped = unescape(raw)
    const { value } = hljs.highlight('js', unescaped)
    return `<code>${value}</code>`
  })
  postMessage(highlighted)
}
