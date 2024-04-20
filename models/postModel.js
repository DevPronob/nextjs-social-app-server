const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postText: {
        type: String,
        required: true // Corrected spelling of "required"
    },
    createdAt: String,
    imageUrl: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{type:mongoose.Schema.Types.ObjectId,ref: 'User'}],
    comments: [{type:mongoose.Schema.Types.ObjectId,ref: 'Comment'}],
});

module.exports = mongoose.model("Post", postSchema); // Changed model name to "Post"
