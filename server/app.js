var express = require('express');
var superagent = require('superagent');
var os = require('os');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getPage', function(req, res) {
    var _page = req.query.page;
    var _tab = req.query.tab;
    superagent
        .get('http://cnodejs.org/api/v1/topics?page=' + _page + '&tab=' + _tab)
        .end(function(err, resp) {
            if (err) {
                return console.error(err);
            }
            res.json(resp.body.data);
        });
});


app.get('/getTopic/', function(req, res) {
    var _topicId = req.query.id;
    superagent
        .get('http://cnodejs.org/api/v1/topic/' + _topicId)
        .end(function(err, resp) {
            if (err) {
                return console.error(err);
            }
            res.json(resp.body.data);
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
