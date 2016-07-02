var React = require('react');

var CommentList = React.createClass({
	
	componentDidUpdate: function() {
		var _c = document.querySelectorAll('.comment_content');
		_c.forEach(function(el, i) {
			el.innerHTML = el.innerText;
		})
	},
	render: function() {
		var ReplyList = this.props.dataReply.map(function(item) {

			return (
				<div className="comment_item" key={item.id}>	
					<div className="user_info">
						<div className="user_avatar">
							<img src={item.author.avatar_url} />
						</div>
						<div className="user_name">{item.author.loginname}</div>
						<div className="time_stamp">{item.create_at}</div>
					</div>
					<div className="comment_content">
						{item.content}
					</div>
				</div>
			)
		})
		return (
			<div className="comment_list">
				{ReplyList}
			</div>
		);
	}
});

module.exports = CommentList;