// Load Node modules
var express = require('express');
const ejs = require('ejs');
var mysql = require('mysql2');
var dotenv = require('dotenv').config();
var helper = require('./functions/helper');

//list of posts
var posts = [];

const setPosts = (rows) => {
    posts = rows;
}

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
    keepAliveInitialDelay: 10000, 
    enableKeepAlive: true
})

helper.initCon(con);

let sql = "SELECT * FROM blogposts ORDER BY id DESC";

con.query(sql, (error, rows, fields) => {
    if (error) {
        return console.error(error.message);
    }

    setPosts(rows);
});

helper.endCon(con);



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
        posts: posts,
        helper: helper
    });
});

var post;

const setPost = (result) => {
    post = result;
    console.log(post);
    console.log(post.title)
}

//blog posts in tech
app.get('/tech/:postId', function(req,res) {
    console.log(req.params.postId);
    setPost(posts.find(o => o.id === +(req.params.postId)));
    
    res.render('pages/blogpage', {
        post: post,
        helper: helper
    });

});

// 404 error handler
app.get('*', function(req,res) {
    res.render('pages/index');
});