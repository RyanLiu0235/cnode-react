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
  fetchTopicDetail,
  collectTopic,
  submitReply,
  likeComment
} from 'actions/topics'
import {
  formatNumber
} from '@/utils'
import './topicDetail'
import formatter from 'format-publish-date'
import Zoomme from 'zoomme'
import 'highlight.js/styles/default.css'

const format = raw => formatter(new Date(raw))

class TopicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reply: ''
    }
  }
  componentWillMount() {
    this._fetchTopicDetail()
  }
  componentDidMount() {
    const container = document.querySelector('.topic_body')
    new Zoomme({
      container
    })
  }
  _fetchTopicDetail() {
    const id = this.props.match.params.id

    this.props.fetchTopicDetail({
      id,
      accesstoken: this.props.accesstoken
    })
  }
  collect() {
    const {
      topic,
      accesstoken,
      collectTopic
    } = this.props
    if (!accesstoken) {
      alert('请先登录！')
      return
    }

    collectTopic({
      accesstoken,
      topic_id: topic.id,
      is_collect: topic.is_collect
    })
  }
  like(id, author) {
    const {
      accesstoken,
      likeComment,
      self
    } = this.props
    if (!accesstoken) {
      alert('请先登录！')
      return
    }
    if (author === self) {
      alert('不能给自己点赞哦！')
      return
    }

    likeComment({
      accesstoken,
      id
    })
  }
  handleInput(e) {
    this.setState({
      reply: e.target.value.trim()
    })
  }
  submit() {
    const {
      accesstoken,
      topic,
      submitReply
    } = this.props
    if (!accesstoken) {
      alert('请先登录！')
      return
    }

    submitReply({
      accesstoken,
      topic_id: topic.id,
      content: this.state.reply
    }).then(res => {
      if (res.success) {
        this._fetchTopicDetail()
        this.setState({
          reply: ''
        })
      }
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
      is_collect,
      content
    } = this.props.topic
    const commentList = replies.length;
    const ReplyList = replies.map((item, index) => {
      return (
        <div className="comment_item" key={item.id}>
          <div className="meta_info">
            <div className="user_info">
              <Link to={ '/user/' + item.author.loginname } className="user_avatar">
                <img src={item.author.avatar_url} alt={item.author.loginname} />
              </Link>
              <span className="user_name">{item.author.loginname}</span>
              <span className="time_stamp">{format(item.create_at)}</span>
              <span className="floor">{index + 1}楼</span>
            </div>
            <div className={'user_action ' + (item.is_uped ? 'liked' : '')} onClick={this.like.bind(this, item.id, item.author.loginname)}>
              <span className="iconfont icon-thumbup"></span>
              <span className="up_number">{item.ups.length}</span>
            </div>
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
            <span>{formatNumber(reply_count)} / {formatNumber(visit_count)}</span>
            <span>发表于：{format(create_at)}</span>
            <div className="button button_info" onClick={this.collect.bind(this)}>{is_collect ? '已' : ''}收藏</div>
          </div>
        </div>
        <div className="topic_body" dangerouslySetInnerHTML={{__html: content}} />
        <div className="topic_comment">
          <div className="comment_header">{!!commentList ? '评论列表' : '暂无评论'}</div>
          <div className="comment_list">{ReplyList}</div>
        </div>
        <div className="topic_reply">
          <p>添加评论</p>
          <div className="form">
            <textarea onChange={this.handleInput.bind(this)}></textarea>
            <div className="button button_info" onClick={this.submit.bind(this)}>提交</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({
  topic,
  accesstoken,
  self
}) {
  return {
    topic,
    accesstoken,
    self: self.loginname
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTopicDetail,
    collectTopic,
    submitReply,
    likeComment
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail)