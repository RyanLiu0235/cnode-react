var React = require('react'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	browserHistory = require('react-router').browserHistory,
	TopicList = require('./index/TopicList'),
	TopicDetail = require('./topicDetail/TopicDetail');

require('../public/less/index');

var Cnode = React.createClass({
	render: function() {
		return (
			<Router history={browserHistory}>
				<Route path="/(:tab)" component={TopicList} />
				<Route path="/topic/:id" component={TopicDetail} />
			</Router>
		);
	}
});

module.exports = Cnode;