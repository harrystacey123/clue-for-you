const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/clue-for-you', {useNewUrlParser: true});



module.exports = {
    User: require('./user'),
    post: require('./post')
}

