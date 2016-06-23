var React = require('react'),
    Link = require('react-router').Link,
    BackToTop = require('./BackToTop'),
    $ = require('jquery');

var TopicList = React.createClass({
    getInitialState: function() {
        return {
        	hostname: 'localhost',
            topicList: [],
            checkMore: false,
            nextPage: 1
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: 'http://' + this.state.hostname + ':3000/getPage',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                page: this.state.nextPage
            },
            success: function(topicList) {
                this.setState({
                    topicList: topicList,
                    checkMore: true,
                    nextPage: 2
                });
            }.bind(this)
        });
    },
    checkMore: function() {
        $.ajax({
            url: 'http://' + this.state.hostname + ':3000/getPage',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                page: this.state.nextPage
            },
            success: function(topicList) {
                var _topicList = this.state.topicList.concat(topicList);
                this.setState({
                    topicList: _topicList,
                    nextPage: (this.state.nextPage + 1)
                });
            }.bind(this)
        });
    },
    render: function() {
        var _list = this.state.topicList.map(function(item) {
            // 获取文章链接的字符串作为key
            var reg = /\/topic\/(.+)/;
            reg.exec(item.title.href);
            var topicId = RegExp.$1;

            return ( 
            	<div className="topic_item" key={ topicId }>
	                <div className="user_avatar">
		                <img src={ item.user.img }/> 
	                </div> 
	                <Link to={ item.title.href } className="topic_title">
	                	<h4> { item.title.content } </h4> 
	                </Link> 
	                <div className="reply_view">
		                <span className="reply_number"> { item.replyView.reply } </span> 
		                <span className="seperate"> /</span>
		                <span className="view_number"> { item.replyView.view } </span> 
	                </div> 
                </div>
            )
        })
        return ( 
        	<div>
	            <div className="topic_list"> 
	            	{ _list } 
	            	<a href = "javascript:;" onClick={ this.checkMore } className={ this.state.checkMore ? "check_more show" : "check_more" }> 查看更多 </a>

	            </div>
	            <BackToTop />
            </div>
        );
    }
});

module.exports = TopicList;
