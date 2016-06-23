$(function() {
    // 返回顶部
    $(window).on('scroll', function() {
        var _h = $(window).height(),
            _top = $(window).scrollTop(),
            $toTop = $('.to_top'),
            timer = null;

        if (_top >= (_h + 100)) {
            $toTop.show();
        } else {
            $toTop.hide();
        }
    });

});
