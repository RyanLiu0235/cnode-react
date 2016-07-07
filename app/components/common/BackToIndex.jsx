var React = require('react');

var BackToIndex = React.createClass({
	render: function() {
		return (
			<a href="javascript:history.back();" className="to_index">
				<img src="./public/img/toIndex.png" />
			</a>
		);
	}
});

module.exports = BackToIndex;