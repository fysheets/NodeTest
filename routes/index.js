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

/* GET New User page. */
router.get('/newUser', function(req, res) {
    res.render('newUser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var hometown = req.body.hometown;
    var favorite = req.body.favorite;
    var image = req.body.image;
    var birthday = new Date(req.body.birthday).getTime();
    var bookClub = req.body.bookClub;
    // adjust bookClub to bool
    if (bookClub == "Yes") {
    	bookClub = true;
    } else {
    	bookClub = false;
    }

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "firstName" : firstName,
        "lastName" : lastName,
        "hometown" : hometown,
        "favorite" : favorite,
        "image" : image,
        "birthday" : birthday,
        "bookClub" : bookClub,
        "books" : []
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("http://mylibrary.test.com:8000/MyLibrary/#/readers");
        }
    });
});

/* GET Edit User page. */
router.get('/editUser?:user', function(req, res) {
	var db = req.db;
    var collection = db.get('usercollection');
    console.log(req.query.user);
    collection.find({'username': req.query.user},{},function(e,docs){
        console.log(docs);
        console.log(docs[0].username);
        res.render('editUser', {
        	title: 'Edit User', 
            "user" : docs[0]
        });
    });
});

/* Update User */
router.post('/updateuser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values
    var userName = req.body.username;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var hometown = req.body.hometown;
    var favorite = req.body.favorite;
    var image = req.body.image;
    var birthday = new Date(req.body.birthday).getTime();
    var bookClub = req.body.bookClub;
    var books = req.body.books;
console.log(image);
    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.update({
        "username" : userName
    }, {
    	"username" : userName,
        "firstName" : firstName,
        "lastName" : lastName,
        "hometown" : hometown,
        "favorite" : favorite,
        "image" : image,
        "birthday" : birthday,
        "bookClub" : bookClub,
        "books" : books
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("http://mylibrary.test.com:8000/MyLibrary/#/readers");
        }
    });
});

/* DELETE User */
router.post('/removeuser', function(req, res) { // wanted to make this a DELETE but hit issues* more investigation
    // Set our internal DB variable
    var db = req.db;

    // Get our form values
    var userName = req.body.username;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.remove({
        "username" : userName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("http://mylibrary.test.com:8000/MyLibrary/#/readers");
        }
    });
});


/* GET books from mongo */
router.get('/testBooks', function(req, res) {
    var db = req.db;
    var collection = db.get('bookcollection');
    collection.find({},{},function(e,docs){
        res.render('testBooks', {
            "testBooks" : docs
        });
    });
});

/* GET New User page. */
router.get('/newBook', function(req, res) {
    res.render('newBook', { title: 'Add New Book' });
});

/* POST to Add User Service */
router.post('/addbook', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var id = req.body.id;
    var title = req.body.title;
    var author = req.body.author;
    var genre = req.body.genre;
    var pubDate = new Date (req.body.pubDate).getTime();
    var image = req.body.image;
    var shopUrl = req.body.shopUrl;

    // Set our collection
    var collection = db.get('bookcollection');

    // Submit to the DB
    collection.insert({
        "id" : id,
        "title" : title,
        "author" : author,
        "genre" : genre,
        "pubDate" : pubDate,
        "image" : image,
        "shopUrl" : shopUrl
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("http://mylibrary.test.com:8000/MyLibrary/#/books");
        }
    });
});

/* POST to Cancel */
router.post('/cancel', function(req, res) {
    res.redirect("http://mylibrary.test.com:8000/MyLibrary/#/books");
});

module.exports = router;
