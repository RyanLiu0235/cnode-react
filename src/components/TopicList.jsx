import React, {
  Component
} from 'react'
import {
  Link
} from 'react-router-dom'

class TopicList extends Component {
  render() {
    const topicList = this.props.topicList.map(item => {
      const topicLink = '/topic/' + item.id;
      return (
        <div className="topic_item" key={ item.id }>
          <div className="user_avatar">
            <img src={ item.author.avatar_url } alt={item.title} />
          </div>
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
      <div>
        <div className="topic_list">
          { topicList }
          <span onClick={ this.props.loadMore } className="load_more">查看更多</span>
        </div>
      </div>
    )
  }
}

export default TopicList