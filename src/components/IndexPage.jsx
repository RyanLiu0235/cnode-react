import React, {
	Component
} from 'react'
import TopicList from './TopicList'
import superagent from 'superagent'

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
				<TopicList topicList={this.state.topicList} checkMore={this.checkMore} />
			</div>
		)
	}
}

export default IndexPage