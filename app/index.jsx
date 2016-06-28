var React = require('react'),
	ReactDom = require('react-dom'),
	Router = require('react-router').Router,
	Route = require('react-router').Route,
	hashHistory = require('react-router').hashHistory,
	TopicList = require('./components/TopicList'),
	TopicDetail = require('./components/TopicDetail');

require('./public/less/index');

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

ReactDom.render(<Cnode />, document.getElementById('cnode_container'));