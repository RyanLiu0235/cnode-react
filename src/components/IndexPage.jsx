import React, {
  Component
} from 'react'
import TopicList from './TopicList'

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
    return fetch(`https://cnodejs.org/api/v1/topics?page=${nextPage}&tab=${tab}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject()
        }
      })
  }
  componentDidMount() {
    const tab = this.props.match.params.id || 'all'
    this.getTopics({
      tab,
      nextPage: this.state.nextPage
    }).then(({
      data,
      success
    }) => {
      this.setState({
        topicList: data,
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
    }).then(({
      data,
      success
    }) => {
      this.setState({
        topicList: data,
        nextPage: 2,
        tab
      })
    })
  }
  loadMore() {
    const state = this.state
    this.getTopics(state).then(({
      data,
      success
    }) => {
      this.setState({
        topicList: [...state.topicList, ...data],
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