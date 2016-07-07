var React = require('react');

var TopicBody = React.createClass({
	render: function() {
		return (
			<div ref="topicBody" className="topic_body">
				<div dangerouslySetInnerHTML={{__html: this.props.dataBody}} />
			</div>
		);
	}
});

module.exports = TopicBody;