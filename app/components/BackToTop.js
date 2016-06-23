var React = require('react'),
	$ = require('jquery');

var BackToTop = React.createClass({
	backToTop: function(e) {
		$('body,html').animate({ scrollTop: 0 }, 500);
        $(e.target).closest('a').fadeOut();
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