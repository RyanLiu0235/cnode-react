import React, {
  Component
} from 'react'
import TopicList from './TopicList'
import superagent from 'superagent'
import NavBar from './NavBar'
import {
  parse
} from 'qs'

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
  componentDidMount() {
    const nextPage = this.state.nextPage
    const {
      tab
    } = parse(this.props.location.search.substr(1))

    superagent
      .get('https://cnodejs.org/api/v1/topics?page=' + nextPage + '&tab=' + tab)
      .end(function(err, data) {
        if (err) {
          console.error(err)
          return
        }
        const topicList = data.body
        this.setState({
          topicList,
          checkMore: true,
          nextPage: 2,
          tab
        })
      }.bind(this))
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