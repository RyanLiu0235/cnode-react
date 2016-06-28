var React = require('react'),
    $ = require('jquery'),
    BackToTop = require('./BackToTop'),
    BackToIndex = require('./BackToIndex'),
    TopicHeader = require('./TopicHeader'),
    TopicBody = require('./TopicBody'),
    CommentList = require('./CommentList');

require('../public/less/index');

var TopicDetail = React.createClass({
    getInitialState: function() {
        return {
        	hostname: 'localhost',
            topicBody: '',
            topicReply: []
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: 'http://' + this.state.hostname + ':5001/getTopic',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                id: this.props.params.id
            },
            success: function(topicDetail) {
                if (this.isMounted()) {
                    this.setState({
                        topicBody: topicDetail.content,
                        topicReply: topicDetail.replies
                    });
                }
            }.bind(this)
        });

        
    },
    render: function() {
        return ( 
        	<div className = "topic_detail">
	            <div>
	            	<TopicBody dataBody = { this.state.topicBody }/> 
	        	</div> 
	        	<div>
	        		<div className = "comment_header">评论列表</div> 
	        		<CommentList dataReply = { this.state.topicReply }/> 
	    		</div> 
	    		<BackToTop />
	            <BackToIndex />
            </div>
        );
    }
});

module.exports = TopicDetail;
