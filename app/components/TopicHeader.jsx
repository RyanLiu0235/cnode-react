var React = require('react');

var TopicHeader = React.createClass({
	
	render: function() {
		var h = this.props.dataHeader;
		return (
			<div className="topic_header">
				<h2 className="topic_title">{h.title}</h2>
				<div className="topic_info">
			        <span>{h.author}</span>
			        <span>{h.create}</span>
			        <span>{h.reply} / {h.read}</span>
		      	</div>
			</div>
		);
	}
});

module.exports = TopicHeader;