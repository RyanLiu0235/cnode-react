var React = require('react'),
	$ = require('jquery');

var TopicBody = React.createClass({
	componentDidUpdate: function() {
	    var topicBody = this.refs.topicBody;
		$(topicBody).html(this.props.dataBody.content);
	},
	render: function() {
		return (
			<div className="topic_body">
				<div ref="topicBody" className="markdown-text">
				</div>
			</div>
		);
	}
});

module.exports = TopicBody;