import React, {
  Component
} from 'react'

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
    let classname = 'to_top ' + (this.state.show ? 'fade-in' : '')

    return (
      <div onClick={this.returnTop} className={classname}></div>
    )
  }
}

export default ToTop