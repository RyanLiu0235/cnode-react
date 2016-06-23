var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var os = require('os');

var app = express();

app.get('/getPage', function(req, res) {
    var _page = req.query.page;
    superagent.get('https://cnodejs.org/?page=' + _page)
        .end(function(err, sres) {
            if (err) {
                return console.error(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .cell').each(function(i, element) {
                var $element = $(element);
                items.push({
                    user: {
                        link: $element.find('.user_avatar').attr('href'),
                        img: $element.find('.user_avatar img').attr('src')
                    },
                    replyView: {
                        reply: $element.find('.reply_count .count_of_replies').text().trim(),
                        view: $element.find('.reply_count .count_of_visits').text().trim()
                    },
                    title: {
                        content: $element.find('.topic_title').attr('title').trim(),
                        href: $element.find('.topic_title').attr('href')
                    }
                });
            });

            res.jsonp(items);
        });
});


app.get('/getTopic', function(req, res) {
    var _topicId = req.query.id;
    superagent.get('https://cnodejs.org/topic/' + _topicId)
        .end(function(err, sres) {
            if (err) {
                return console.error(err);
            }
            var $ = cheerio.load(sres.text);

            var items = {
                topic: {},
                comment: []
            };

            items.topic.header = {
                title: $('.topic_header .topic_full_title').text().trim(),
                timeStamp: $('.topic_header .changes span').eq(0).text().trim(),
                author: $('.topic_header .changes span').eq(1).text().trim(),
                view: $('.topic_header .changes span').eq(2).text().trim()
            };

            items.topic.body = {
                content: $('.topic_content .markdown-text').html()
            }
            if ($('#content .panel .reply_item').length) {
                var comment = $('.reply_item');
                comment.each(function(idx, element) {
                    var $element = $(element);
                    items.comment.push({
                        id: $element.find('.anchor').attr('id'),
                        author: {
                            link: $element.find('.author_content .user_avatar').attr('href'),
                            img: $element.find('.author_content .user_avatar img').attr('src'),
                            name: $element.find('.author_content .reply_author').text().trim(),
                            time: $element.find('.author_content .reply_time').text().trim()
                        },
                        reply: $element.find('.markdown-text').html()
                    });
                });
            }

            res.jsonp(items);
        });
})

app.listen(5001, function() {
    console.log('server is running at http://' + getIpAddress() + ':' + 5001);
    console.log('app is running at http://' + getIpAddress() + ':' + 5000);
});

// 获取本机IP地址
function getIpAddress() {
    var info = os.networkInterfaces();
    var address, dev;
    for (dev in info) {
        info[dev].forEach(function(v, i) {
            if (!!v.family && v.family === 'IPv4' && !v.internal) {
                address = v.address;
                return;
            }
        });
    }
    return address || '127.0.0.1';
}