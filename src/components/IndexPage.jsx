import React, {
	Component
} from 'react'
import TopicList from './TopicList'
import superagent from 'superagent'
import NavBar from './NavBar'

class IndexPage extends Component {
	constructor(props) {
    super(props)
    this.state = {
    	hostname: 'localhost',
			topicList: [],
			checkMore: false,
			nextPage: 1,
			tab: ''
    }
  }
	render() {
		return (
			<div>
				<NavBar />
				<TopicList topicList={this.state.topicList} checkMore={this.checkMore} />
			</div>
		)
	}
}

export default IndexPage