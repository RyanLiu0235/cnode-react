import React, {
  Component
} from 'react'
import TopicList from './TopicList'
import superagent from 'superagent'

class IndexPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topicList: [],
      nextPage: 1,
      tab: 'all'
    }
  }
  getTopics({
    tab,
    nextPage
  }) {
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
    const tab = this.props.match.params.id || 'all'
    this.getTopics({
      tab,
      nextPage: this.state.nextPage
    }).then(rs => {
      this.setState({
        topicList: rs,
        nextPage: 2,
        tab
      })
    })
  }
  componentWillReceiveProps({
    match
  }) {
    const state = this.state
    const tab = match.params.id
    const nextPage = state.nextPage
    this.getTopics({
      tab,
      nextPage: tab !== state.tab ? 1 : nextPage
    }).then(rs => {
      this.setState({
        topicList: rs,
        nextPage: 2,
        tab
      })
    })
  }
  loadMore() {
    const state = this.state
    this.getTopics(state).then(rs => {
      this.setState({
        topicList: [...state.topicList, ...rs],
        nextPage: state.nextPage + 1
      })
    })
  }
  render() {
    return (
      <TopicList topicList={this.state.topicList} loadMore={this.loadMore.bind(this)} />
    )
  }
}

export default IndexPage