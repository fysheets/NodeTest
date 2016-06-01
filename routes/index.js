var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users from mongo */
router.get('/testUsers', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('testUsers', {
            "testUsers" : docs
        });
    });
});

/* GET users from mongo */
router.get('/testBooks', function(req, res) {
    var db = req.db;
    var collection = db.get('bookcollection');
    collection.find({},{},function(e,docs){
        res.render('testBooks', {
            "testBooks" : docs
        });
    });
});

module.exports = router;
