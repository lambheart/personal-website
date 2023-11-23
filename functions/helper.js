var moment = require('moment');

function getDateFormat(date) {
    var curYear = new Date().getFullYear();
    if (date.getFullYear() != curYear) {
        return moment(date).format('MMM DD YYYY').toUpperCase();
    } else return moment(date).format('MMM DD').toUpperCase();
}

function getPostPage(id) {
    console.log('click');
    window.location='/tech/${id}';
}

function endCon(con) {
    con.end(function(err) {
        if (err) {
            return console.error('error: ' + err.message);
        }
    
        console.log("Close connection to MySQL server");
    });
}

function initCon(con) {
    con.connect(function(err) {
        if (err) {
            return console.error('error: ' + err.message);
        }
    
        console.log("Connected to MySQL server");
    
    
    });
}

module.exports = {
    getDateFormat: getDateFormat,
    getPostPage: getPostPage,
    endCon: endCon,
    initCon: initCon
}