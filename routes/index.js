var express = require('express');
var router = express.Router();
var app = require('../app');

/* GET home page. */

var board = app.get('board');

board.on('ready',function(){
    router.get('*', function(req, res, next){
        app.locals.board = app.get('board');
        next();
    });

    router.get('/', function(req, res) {
      res.render('index', { title: 'Express' });
    });
});

module.exports = router;
