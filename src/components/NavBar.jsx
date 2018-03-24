import React, {
  Component
} from 'react'
import {
  NavLink
} from 'react-router-dom'
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
  goBack() {
    window.history.back()
  }
  render() {
    const navList = list.map(item => {
      return (
        <NavLink activeClassName="cur" className="tab_item" to={"/tab/" + item.name} key={item.name}>
          {item.text}
        </NavLink>
      )
    })
    const loginBox = <NavLink className="tab_item" to="/signin">登录</NavLink>
    return (
      <div className="panel">
        <div className="header_container">
          <div className="back_button" onClick={this.goBack}></div>
          <div className="tab_list">
            {navList}
          </div>
          <div className="login">
            {loginBox}
            {/*<a v-if="!loginname" className="tab_item" v-link="{ path: '/signin' }">登录</a>
            <a v-if="loginname" className=" user_name" v-link="{ path: '/user/' + loginname }">
              <img :src="avatar_url" alt={} />
              <i v-if="unread > 0" className="unread_num">{{ unread }}</i>
            </a>*/}
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar