import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import './footer'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <span className="footer-item">cnode-react</span>
        <Link target="_blank" to="https://github.com/stop2stare/cnode-react" className="footer-item iconfont icon-github"></Link>
        <span className="footer-item">Copyright ©2018 stop2stare</span>
      </div>
    )
  }
}

export default Footer