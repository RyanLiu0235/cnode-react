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
      topicList: [],
      checkMore: false,
      nextPage: 1,
      tab: 'all'
    }
  }
  componentDidMount() {
    const nextPage = this.state.nextPage
    const tab = this.props.match.params.id

    superagent
      .get(`https://cnodejs.org/api/v1/topics?page=${nextPage}&tab=${tab || this.state.tab}`)
      .end(function(err, data) {
        if (err) {
          console.error(err)
          return
        }
        const topicList = data.body.data
        this.setState({
          topicList,
          checkMore: true,
          nextPage: 2,
          tab
        })
      }.bind(this))
  }
  componentWillReceiveProps(nextProps) {
    const tab = nextProps.match.params.id

    superagent
      .get('https://cnodejs.org/api/v1/topics?tab=' + tab + '&page=1')
      .end(function(err, data) {
        if (err) {
          console.error(err)
          return
        }
        const topicList = data.body.data
        this.setState({
          topicList,
          tab,
          nextPage: 2
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