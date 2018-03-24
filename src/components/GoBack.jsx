import React, {
  Component
} from 'react'

class GoBack extends Component {
  goBack() {
    window.history.back()
  }
  render() {
    return (
      <div onClick={this.goBack} className='go_back'></div>
    )
  }
}

export default GoBack