var React = require('react'),
	timeFormat = require('../../utils').timeFormat;

var CommentList = React.createClass({
	render: function() {
		var commentList = this.props.dataReply.length;
		var ReplyList = this.props.dataReply.map(function(item) {

			return (
				<div className="comment_item" key={item.id}>	
					<div className="user_info">
						<div className="user_avatar">
							<img src={item.author.avatar_url} />
						</div>
						<div className="user_name">{item.author.loginname}</div>
						<div className="time_stamp">{timeFormat(item.create_at)}</div>
					</div>
					<div className="comment_content">
						<div dangerouslySetInnerHTML={{__html: item.content}} />
					</div>
				</div>
			)
		})

		return (
			<div>
				<div className="comment_header">{!!commentList ? '评论列表' : '暂无评论'}</div> 
				<div className="comment_list">
					{ReplyList}
				</div>
			</div>
		);
	}
});

module.exports = CommentList;