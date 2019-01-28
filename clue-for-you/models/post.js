const mongoose = require('mongoose');
    Schema = mongoose.Schema;

const PostSchema = new Schema ({
    answer: String,
    clue: String,
    categoryID: String,
    image: String,
    userID: String
})

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
