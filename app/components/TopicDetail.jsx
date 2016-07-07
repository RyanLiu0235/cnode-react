var React = require('react'),
    superagent = require('superagent'),
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
            topicHeader: {},
            topicReply: []
        };
    },
    componentDidMount: function() {
        var _id = this.props.params.id;
        superagent
            .get('http://' + this.state.hostname + ':5001/getTopic?id=' + _id)
            .end(function(err, data) {
                var topicDetail = data.body;
                if (err) {
                    console.error(err);
                    return;
                }
                if (this.isMounted()) {
                    this.setState({
                        topicHeader: {
                            title: topicDetail.title,
                            reply: topicDetail.reply_count,
                            read: topicDetail.visit_count,
                            create: topicDetail.create_at,
                            author: topicDetail.author.loginname
                        },
                        topicBody: topicDetail.content,
                        topicReply: topicDetail.replies
                    });
                }

            }.bind(this));
    },
    render: function() {
        return ( 
        	<div className = "topic_detail">
	            <div>
                    <TopicHeader dataHeader={this.state.topicHeader} />
	            	<TopicBody dataBody={ this.state.topicBody }/> 
	        	</div> 
	        	<div>
	        		<div className="comment_header">评论列表</div> 
	        		<CommentList dataReply={ this.state.topicReply }/> 
	    		</div> 
	    		<BackToTop />
	            <BackToIndex />
            </div>
        );
    }
});

module.exports = TopicDetail;
