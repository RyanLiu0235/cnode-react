import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Link
} from 'react-router-dom'
import {
  bindActionCreators
} from 'redux'
import {
  fetchTopics
} from '../actions'

class IndexPage extends Component {
  componentDidMount() {
    const {
      match,
      topics,
      fetchTopics
    } = this.props
    const tab = match.params.id || 'all'

    fetchTopics({
      tab,
      page: topics.page
    })
  }
  componentWillReceiveProps(nextProps) {
    const {
      topics,
      fetchTopics,
      match
    } = nextProps
    const tab = topics.tab
    const newTab = match.params.id

    if (newTab !== tab) {
      fetchTopics({
        tab: newTab,
        page: 1
      })
    }
  }
  loadMore() {
    const {
      topics,
      fetchTopics
    } = this.props
    const {
      tab,
      page
    } = topics

    fetchTopics({
      tab,
      page: page + 1
    })
  }
  render() {
    const topicList = this.props.topics.list.map(item => {
      const topicLink = '/topic/' + item.id;
      return (
        <div className="topic_item" key={ item.id }>
          <Link to={ '/user/' + item.author.loginname } className="user_avatar">
            <img src={ item.author.avatar_url } alt={ item.title } />
          </Link>
          <h4 className="topic_title">
            <Link to={ topicLink }>{ item.title }</Link>
          </h4>
          <div className="reply_view">
            <span className="reply_number">{ item.reply_count }</span>
            <span className="seperate">/</span>
            <span className="view_number">{ item.visit_count}</span>
          </div>
        </div>
      )
    })
    return (
      <div className="topic_list">
        { topicList }
        <span onClick={ this.props.loadMore } className="load_more">查看更多</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    topics: state.topics
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTopics
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)