var React = require('react'),
	$ = require('jquery');

var CommentList = React.createClass({
	
	componentDidUpdate: function() {
		var _c = $('.comment_content .markdown-text');
		_c.each(function(i, el) {
			// console.log(el)
			var _comment = $(el).text();
			$(el).html(_comment).show();
		});
	},
	render: function() {
		var c = this.props.dataComment;
		// console.log(c)
		var commentList = c.map(function(item) {
			return (
				<div className="comment_item" key={item.id}>	
					<div className="user_info">
						<div className="user_avatar">
							<img src={item.author.img} />
						</div>
						<div className="user_name">{item.author.name}</div>
						<div className="time_stamp">{item.author.time}</div>
					</div>
					<div className="comment_content">
						<div className="markdown-text" ref="commentBody" >
							{item.reply}
						</div>
					</div>
				</div>
			)
		})
		return (
			<div className="comment_list">
				{commentList}
			</div>
		);
	}
});

module.exports = CommentList;