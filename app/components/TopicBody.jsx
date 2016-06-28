var React = require('react'),
	$ = require('jquery');

var TopicBody = React.createClass({
	componentDidUpdate: function() {
	    var topicBody = this.refs.topicBody;
		$(topicBody).html(this.props.dataBody);
	},
	render: function() {
		return (
			<div ref="topicBody" className="topic_body">
			</div>
		);
	}
});

module.exports = TopicBody;