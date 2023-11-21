// Load Node modules
var express = require('express');
const ejs = require('ejs');
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
    res.render('pages/tech');
});