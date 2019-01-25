const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/clue-for-you', {useNewUrlParser: true});

module.exports = {
    User: require('./user'),
}

