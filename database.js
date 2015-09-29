var mongoose = require('mongoose');

var url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/';

mongoose.connect(url + 'mcq');

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
