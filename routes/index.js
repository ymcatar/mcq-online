var express = require('express');
var router = express.Router();
var path = require('path');

var Paper = require('../database.js').Paper;
var Attempt = require('../database.js').Attempt;

router.post('/json/attempt', function(req, res, next) {
    var body = JSON.parse(req.body.content);

    var attempt = new Attempt({
        qid: body.qid,
        user: body.user,
        selected: body.selected
    });

    attempt.save(function(err, data) {
        if(err) {
            console.error(err);
            res.status(400);
            res.end();
        } else {
            res.status(200);
            res.end();
        }
    });
});

router.get('/json/attempt/:qid', function(req, res, next) {
    Attempt.find({ qid: req.params.qid }, function(err, data) {
        if(err) {
            console.error(err);
            res.status(400);
            res.end();
        } else {
            res.json(data);
            res.end();
        }
    });
});

router.get('/json/paper', function(req, res, next) {
    Paper.find({}, function(err, data) {
        if(err) {
            res.status(400);
            res.end();
        } else {
            res.json(data);
        }
    });
});

router.get('/json/paper/:id', function(req, res, next) {
    var id = req.params.id;

    Paper.findOne({_id: id}, function(err, data) {
        if(err) {
            res.status(400);
            res.end();
        } else {
            res.json(data);
        }
    });
});

router.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../src', 'index.html'));
});

module.exports = router;
