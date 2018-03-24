import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import 'normalize.css'
import './public/styles/index.less'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
