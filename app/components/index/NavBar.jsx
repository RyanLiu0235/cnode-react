var React = require('react'),
	IndexLink = require('react-router').IndexLink;

var NavBar = React.createClass({
	render: function() {
		return (
			<div className="nav_bar">
				<IndexLink activeClassName="cur" className="nav_item" to="/?tab=all">
					全部
				</IndexLink>
				<IndexLink activeClassName="cur" className="nav_item" to="/?tab=good">
					精华
				</IndexLink>
				<IndexLink activeClassName="cur" className="nav_item" to="/?tab=share">
					分享
				</IndexLink>
				<IndexLink activeClassName="cur" className="nav_item" to="/?tab=ask">
					问答
				</IndexLink>
				<IndexLink activeClassName="cur" className="nav_item" to="/?tab=job">
					招聘
				</IndexLink>
			</div>
		);
	}
});

module.exports = NavBar;