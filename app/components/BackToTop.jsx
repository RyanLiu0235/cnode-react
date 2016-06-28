var React = require('react'),
	$ = require('jquery');

var BackToTop = React.createClass({
	backToTop: function(e) {
		$('body,html').animate({ scrollTop: 0 }, 500);
        $(e.target).closest('a').fadeOut();
	},
	componentDidMount: function() {
	    // 返回顶部
	    $(window).on('scroll', function() {
	        var _h = $(window).height(),
	            _top = $(window).scrollTop(),
	            $toTop = $('.to_top');

	        if (_top >= (_h + 100)) {
	            $toTop.show();
	        } else {
	            $toTop.hide();
	        }
	    });  
	},
	render: function() {
		return (
			<div onClick={this.backToTop} className="to_top">
				<img src="./public/img/toTop.png" />
			</div>
		);
	}
});

module.exports = BackToTop;