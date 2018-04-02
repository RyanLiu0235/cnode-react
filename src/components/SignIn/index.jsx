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
} from 'actions/users'
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
      accesstoken: e.target.value.trim()
    })
  }
  handleSignin() {
    this.setState = {
      landState: '登录中...'
    }

    this.props.login(this.state.accesstoken).then(({ loginname }) => {
      this.props.history.push('/')
      this.props.fetchSelf(loginname)
      localStorage.setItem('cnode', loginname)
      localStorage.setItem('accesstoken', this.state.accesstoken)
    }, err => {
      console.error(err)
    })
  }
  render() {
    const buttonClass = 'button ' + (this.state.landState === '登录中...' ? 'button_primary' : 'button_info')
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