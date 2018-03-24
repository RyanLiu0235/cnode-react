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
      nextPage: 1,
      tab: 'all'
    }
  }
  getTopics(tab) {
    const {
      nextPage
    } = this.state

    return new Promise((resolve, reject) => {
      superagent
        .get(`https://cnodejs.org/api/v1/topics?page=${nextPage}&tab=${tab}`)
        .end(function(err, data) {
          if (err) {
            reject(err)
          } else {
            resolve(data.body.data)
          }
        })
    })
  }
  componentDidMount() {
    const tab = this.props.match.params.id
    this.getTopics(tab).then(rs => {
      this.setState({
        topicList: rs,
        nextPage: 2,
        tab
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    const tab = nextProps.match.params.id
    this.getTopics(tab).then(rs => {
      this.setState({
        topicList: rs,
        nextPage: 2,
        tab
      })
    })
  }
  loadMore() {
    this.getTopics(this.state.tab).then(rs => {
      this.setState({
        topicList: [...this.state.topicList, ...rs],
        nextPage: this.state.nextPage + 1
      })
    })
  }
  render() {
    return (
      <div>
        <NavBar />
        <TopicList topicList={this.state.topicList} loadMore={this.loadMore.bind(this)} />
      </div>
    )
  }
}

export default IndexPage