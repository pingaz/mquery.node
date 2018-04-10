var express = require('express');
var router = express.Router();
var config = require('./config');

/* GET setting page. */
router.get('/settings', function (req, res, next) {
    var remote = config.getRemote();
    res.render('index', {title: 'INPUT REMOTE PATH', remote: remote});
});
router.post('/settings', function (req, res, next) {
    var remote = req.body.remote;
    var err_info = '';
    if (remote) {
        var request = require('request');
        remote = remote.indexOf('http://')===0 || remote.indexOf('https://')===0 ? remote : "http://"+remote;
        request(remote, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                config.setRemote(remote);
                res.redirect('/settings');
                return;
            }else if(error.code === 'ECONNREFUSED'){
                err_info = '连接失败，请检查地址是否正确。';
            }else if(error){
                err_info = '连接失败，请稍后再试。';
            }else{
                err_info = '连接服务器异常：' + response.statusText;
            }
            res.render('index', {title: 'REMOTE PATH ERROR', error:err_info, remote: remote});
        });
    }else{
        res.render('index', {title: 'EMPTY REMOTE PATH', remote: remote});
    }
});

/* GET home page. */
router.get('/:id', function (req, res, next){
    var finderId = req.params.id;
    res.render('search', {title: 'Express', id: finderId});
});

/* GET search by id. */
var getSearch = function(req, res, next){
    var finderId = req.params.id;
    var request = require('request');
    var remote = config.getRemote();
    request(remote+"/search/"+finderId, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response.body);
            res.send(response.body);
        }else if(error.code === 'ECONNREFUSED'){
            error.code = '连接失败，请检查地址是否正确。';
        }else if(error){
            error.code = '连接失败，请稍后再试。';
        }else{
            error.code = '连接服务器异常：' + response.statusText;
        }
    });
};
router.get('/s/:id', getSearch);
router.get('/search/:id', getSearch);

/* POST query by id. */
var postSearch = function(req, res, next){
    var finderId = req.params.id;
    var request = require('request');
    var remote = config.getRemote();
    request(remote+"/query/"+finderId, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response.body);
            res.send(response.body);
        }else if(error.code === 'ECONNREFUSED'){
            error.code = '连接失败，请检查地址是否正确。';
        }else if(error){
            error.code = '连接失败，请稍后再试。';
        }else{
            error.code = '连接服务器异常：' + response.statusText;
        }
    });
};
router.post('/q/:id', postSearch);
router.post('/query/:id', postSearch);

module.exports = router;
