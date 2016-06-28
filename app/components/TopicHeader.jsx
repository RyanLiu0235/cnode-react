var React = require('react'),
	$ = require('jquery');

var TopicHeader = React.createClass({
	
	render: function() {
		// console.log(this.props)
		var h = this.props.dataHeader;
		return (
			<div className="topic_header">
				<h2 className="topic_title">{h.title}</h2>
				<div className="topic_info">
			        <span>{h.timeStamp}</span>
			        <span>{h.author}</span>
			        <span>{h.view}</span>
		      	</div>
			</div>
		);
	}
});

module.exports = TopicHeader;