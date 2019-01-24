const mongoose = require('mongoose');
    Schema = mongoose.Schema;

const UserSchema = new Schema ({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
