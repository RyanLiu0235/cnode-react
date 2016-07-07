var React = require('react');

var BackToTop = React.createClass({
	backToTop: function(e) {
  		document.body.scrollTop = 0;
	},
	scrollToTop: function() {
		var _h = window.screen.height,
    		_top = document.body.scrollTop,
    		$toTop = document.querySelector('.to_top');

    	if (_top >= (_h + 100)) {
            $toTop.style.display = 'block';
        } else {
            $toTop.style.display = 'none';
        }
	},
	componentDidMount: function() {
	    // 返回顶部
	    window.addEventListener('scroll', this.scrollToTop, false);
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