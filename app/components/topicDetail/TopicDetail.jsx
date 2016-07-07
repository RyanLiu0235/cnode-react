var React = require('react'),
    superagent = require('superagent'),
    BackToTop = require('../common/BackToTop'),
    BackToIndex = require('../common/BackToIndex'),
    TopicHeader = require('./TopicHeader'),
    TopicBody = require('./TopicBody'),
    CommentList = require('./CommentList');

var TopicDetail = React.createClass({
    getInitialState: function() {
        return {
        	hostname: '10.161.152.102',
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
        		<CommentList dataReply={ this.state.topicReply }/> 
	    		<BackToTop />
	            <BackToIndex />
            </div>
        );
    }
});

module.exports = TopicDetail;
