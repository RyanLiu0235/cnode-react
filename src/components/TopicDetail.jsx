import React, {
  Component
} from 'react'
import superagent from 'superagent'
import formatter from 'format-publish-date'

const format = raw => formatter(new Date(raw))

class TopicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: {
        replies: [],
        title: '',
        author: '',
        create_at: 0,
        reply_count: 0,
        visit_count: 0,
        content: ''
      }
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id

    superagent
      .get(`https://cnodejs.org/api/v1/topic/${id}`)
      .end(function(err, data) {
        if (err) {
          console.error(err)
          return
        }
        this.setState({
          detail: data.body.data
        })
      }.bind(this))
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
    } = this.state.detail
    const commentList = replies.length;
    const ReplyList = replies.map((item, index) => {
      return (
        <div className="comment_item" key={item.id}>
          <div className="user_info">
            <div className="user_avatar">
              <img src={item.author.avatar_url} alt={item.author.loginname} />
            </div>
            <div className="user_name">{item.author.loginname}</div>
            <div className="time_stamp">{format(item.create_at)}</div>
            <div className="floor">{index + 1}楼</div>
          </div>
          <div className="comment_content">
            <div dangerouslySetInnerHTML={{__html: item.content}} />
          </div>
        </div>
      )
    })
    return (
      <div className="topic_detail">
        <div className="topic_header">
          <h2 className="topic_title">{title}</h2>
          <div className="topic_info">
            <span>{author.loginname}</span>
            <span>{format(create_at)}</span>
            <span>{reply_count} / {visit_count}</span>
          </div>
        </div>
        <div ref="topicBody" className="topic_body">
          <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
        <div className="topic_comment">
          <div className="comment_header">{!!commentList ? '评论列表' : '暂无评论'}</div>
          <div className="comment_list">{ReplyList}</div>
        </div>
      </div>
    )
  }
}

export default TopicDetail