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
	render() {
		const navList = list.map(item => {
			return (
				<NavLink activeClassName="cur" className="nav_item" to="/?tab={item.name}">
					{item.text}
				</NavLink>
			)
		})
		return (
			<div className="nav_bar">
				{navList}
			</div>
		)
	}
})

export default NavBar