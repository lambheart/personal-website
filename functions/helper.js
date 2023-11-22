var moment = require('moment');

function getDateFormat(date) {
    var curYear = new Date().getFullYear();
    if (date.getFullYear() != curYear) {
        return moment(date).format('MMM DD YYYY').toUpperCase();
    } else return moment(date).format('MMM DD').toUpperCase();
}

module.exports = {
    getDateFormat: getDateFormat
}