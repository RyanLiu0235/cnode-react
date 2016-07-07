var React = require('react'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	hashHistory = require('react-router').hashHistory,
	TopicList = require('./topicList/TopicList'),
	TopicDetail = require('./topicDetail/TopicDetail');

require('../public/less/index');

var Cnode = React.createClass({
	render: function() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={TopicList} />
				<Route path="/topic/:id" component={TopicDetail} />
			</Router>
		);
	}
});

module.exports = Cnode;