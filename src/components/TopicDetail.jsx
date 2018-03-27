import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import {
  fetchTopicDetail
} from '../actions'
import formatter from 'format-publish-date'
import Zoomme from 'zoomme'

const format = raw => formatter(new Date(raw))

class TopicDetail extends Component {
  componentWillMount() {
    const id = this.props.match.params.id

    this.props.fetchTopicDetail({
      id
    })
  }
  componentDidMount() {
    const container = document.querySelector('.topic_body')
    new Zoomme({
      container
    })
  }
  render() {
    const {
      replies,
      title,
      author,
      create_at,
      reply_count,
      visit_count,
      content
    } = this.props.topic
    const commentList = replies.length;
    const ReplyList = replies.map((item, index) => {
      return (
        <div className="comment_item" key={item.id}>
          <div className="user_info">
            <Link to={ '/user/' + item.author.loginname } className="user_avatar">
              <img src={item.author.avatar_url} alt={item.author.loginname} />
            </Link>
            <span className="user_name">{item.author.loginname}</span>
            <span className="time_stamp">{format(item.create_at)}</span>
            <span className="floor">{index + 1}楼</span>
          </div>
          <div className="comment_content" dangerouslySetInnerHTML={{__html: item.content}} />
        </div>
      )
    })
    return (
      <div className="topic_detail">
        <div className="topic_header">
          <h2 className="topic_title">{title}</h2>
          <div className="topic_info">
            <span>{author.loginname}</span>
            <span>{reply_count} / {visit_count}</span>
            <span>发表于：{format(create_at)}</span>
          </div>
        </div>
        <div className="topic_body" dangerouslySetInnerHTML={{__html: content}} />
        <div className="topic_comment">
          <div className="comment_header">{!!commentList ? '评论列表' : '暂无评论'}</div>
          <div className="comment_list">{ReplyList}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    topic: state.topic
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTopicDetail
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail)