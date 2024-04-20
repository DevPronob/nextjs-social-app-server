const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentText: String,
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdAt: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model("Comment", commentSchema); // Changed model name to "Post"
