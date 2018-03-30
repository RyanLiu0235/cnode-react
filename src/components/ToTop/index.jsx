import React, {
  Component
} from 'react'
import './toTop'

class ToTop extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) {
        this.setState({
          show: true
        })
      } else {
        this.setState({
          show: false
        })
      }
    })
  }
  returnTop() {
    window.scrollTo(0, 0)
  }
  render() {
    let classname = 'iconfont icon-top ' + (this.state.show ? 'fade-in' : '')

    return (
      <div id="to_top" onClick={this.returnTop} className={classname}></div>
    )
  }
}

export default ToTop