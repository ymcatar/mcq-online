var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mcq');

var Paper = mongoose.model('Paper', {
    title: String,
    count: Number,
    defaultLength: Number,
    specialLength: Object
});

var Attempt = mongoose.model('Attempt', {
    qid: String,
    user: String,
    selected: Object
});

module.exports = {
    Paper: Paper,
    Attempt: Attempt
};
