import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import {
  login,
  fetchSelf
} from '@/actions'
import './signIn'

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accesstoken: '',
      landState: '登录'
    }
  }
  handleInput(e) {
    this.setState({
      accesstoken: e.target.value
    })
  }
  handleSignin() {
    this.setState = {
      landState: '登录中...'
    }

    this.props.login(this.state.accesstoken).then(({ loginname }) => {
      this.props.history.push('/')
      this.props.fetchSelf(loginname)
      // 种cookie，设置过期时间为12个小时之后
      const later = new Date(Date.now() + 3600 * 12)
      document.cookie = `cnode=${loginname}; expires=${later}; accesstoken=${this.state.accesstoken}; expires=${later};`
    }, err => {
      console.error(err)
    })
  }
  render() {
    const buttonClass = 'signup_button ' + (this.state.landState === '登录中...' ? 'landing' : '')
    return (
      <div className="panel">
				<p className="panel_title">登录到CNode</p>
				<div className="signup_form">
					<div className="accesstoken">
						<label htmlFor="accesstoken">accessToken：</label>
						<div className="form_control">
							<input onChange={this.handleInput.bind(this)} type="text" name="accesstoken" placeholder="请输入" />
						</div>
					</div>
					<div className="button_container">
						<span className={buttonClass} onClick={this.handleSignin.bind(this)}>{ this.state.landState }</span>
					</div>
				</div>
			</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login,
    fetchSelf
  }, dispatch)
}

export default connect(() => ({}), mapDispatchToProps)(SignIn)