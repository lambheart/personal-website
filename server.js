// Load Node modules
var express = require('express');
const ejs = require('ejs');
var mysql = require('mysql2');
var dotenv = require('dotenv').config();

//list of posts
var posts = [];

const setPosts = (rows) => {
    posts = rows;
    console.log(posts);
}

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    keepAliveInitialDelay: 10000, 
    enableKeepAlive: true,
    dateStrings: true
})

con.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log("Connected to MySQL server");


});

let sql = "SELECT * FROM blogposts ORDER BY id DESC";

con.query(sql, (error, rows, fields) => {
    if (error) {
        return console.error(error.message);
    }

    setPosts(rows);
});

con.end(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log("Close connection to MySQL server");
});



// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
app.listen(8080);

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});

// about route
app.get('/about', function (req, res) {
    res.render('pages/about');
});

// art route
app.get('/art', function (req, res) {
    res.render('pages/art');
});

// tech route
app.get('/tech', function (req, res) {
    res.render('pages/tech', {
        posts: posts
    });
});

//error handler