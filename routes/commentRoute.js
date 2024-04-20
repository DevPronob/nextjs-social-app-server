const express = require("express");
const router = express.Router();
const Comment = require('../models/commentsModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')
const mongoose = require('mongoose');
router.post("/", async (req, res) => {
    // res.send(req.body.postId,req.body.createdBy,req.body.commentText,req.body.createdAt)
    console.log(req.body.postId,req.body.createdBy,req.body.commentText,req.body.createdAt)
    try {
        const commentData = { 
            postId:req.body.postId,
            createdBy:req.body.createdBy,
            commentText:req.body.commentText,
            createdAt:req.body.createdAt
        };
        const postRes =await Post.findById({_id:req.body.postId})
        const commentRes =await Comment.create(commentData)
        postRes.comments.push(commentRes._id)
        const result=await postRes.save()
       return res.status(201).json(result);
        //    return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});

module.exports = router;