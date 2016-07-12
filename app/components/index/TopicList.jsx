var React = require('react'),
    Link = require('react-router').Link,
    BackToTop = require('../common/BackToTop'),
    NavBar = require('./NavBar'),
    superagent = require('superagent');

var TopicList = React.createClass({
    render: function() {
        var _list = this.props.topicList.map(function(item) {
            var topicLink = '/topic/' + item.id;
            return ( 
            	<div className="topic_item" key={ item.id }>
	                <div className="user_avatar">
		                <img src={ item.author.avatar_url }/> 
	                </div> 
	                <Link to={ topicLink } className="topic_title">
	                	<h4> { item.title } </h4> 
	                </Link> 
	                <div className="reply_view">
		                <span className="reply_number"> { item.reply_count } </span> 
		                <span className="seperate">/</span>
		                <span className="view_number"> { item.visit_count} </span> 
	                </div> 
                </div>
            )
        })
        return ( 
        	<div>
	            <div className="topic_list">
	            	{ _list } 
	            	<a href = "javascript:;" onClick={ this.props.checkMore } className="check_more"> 查看更多 </a>
	            </div>
	            <BackToTop />
            </div>
        );
    }
});

module.exports = TopicList;
