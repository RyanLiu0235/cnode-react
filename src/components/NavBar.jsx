import React, {
  Component
} from 'react'
import {
  NavLink
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import {
  fetchSelf
} from '../actions'
import {
  getCookie
} from '../utils'

const list = [{
  name: 'all',
  text: '全部'
}, {
  name: 'good',
  text: '精华'
}, {
  name: 'share',
  text: '分享'
}, {
  name: 'ask',
  text: '问答'
}, {
  name: 'job',
  text: '招聘'
}]

class NavBar extends Component {
  componentWillMount() {
    const cnode = getCookie(document.cookie, 'cnode')

    if (cnode) {
      this.props.fetchSelf(cnode)
    }
  }
  goBack() {
    window.history.back()
  }
  render() {
    const user = this.props.self
    const navList = list.map(item => {
      return (
        <NavLink className="tab_item" to={"/tab/" + item.name} key={item.name}>
          {item.text}
        </NavLink>
      )
    })

    return (
      <div className="panel">
        <div className="header_container">
          <div className="back_button" onClick={this.goBack}></div>
          <div className="tab_list">
            {navList}
          </div>
          <div className="login">
          {
            user.loginname ?
            <NavLink className=" user_name" to={ '/user/' + user.loginname }>
              <img src={ user.avatar_url } alt={ user.loginname } />
              {/*<i v-if="unread > 0" className="unread_num">{ unread }</i>*/}
            </NavLink> :
            <NavLink className="tab_item" to="/signin">登录</NavLink>
          }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    self: state.self
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSelf
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)