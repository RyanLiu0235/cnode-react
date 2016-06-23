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
            topicDetail: {
                topic: {
                    header: {
                        title: '',
                        timeStamp: '',
                        view: '',
                        author: ''
                    },

                    body: {
                        content: ''
                    }
                },
                comment: []
            }
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
                        topicDetail: topicDetail
                    });
                }
            }.bind(this)
        })
    },
    render: function() {
        return ( 
        	<div className = "topic_detail">
	            <div>
	            	<TopicHeader dataHeader = { this.state.topicDetail.topic.header }/> 
	            	<TopicBody dataBody = { this.state.topicDetail.topic.body }/> 
	        	</div> 
	        	<div>
	        		<div className = "comment_header">评论列表</div> 
	        		<CommentList dataComment = { this.state.topicDetail.comment }/> 
	    		</div> 
	    		<BackToTop />
	            <BackToIndex />
            </div>
        );
    }
});

module.exports = TopicDetail;
