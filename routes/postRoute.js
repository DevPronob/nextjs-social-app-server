const express = require("express");
const router = express.Router();
const Post = require('../models/postModel')
const User = require('../models/userModel')
const Comment = require('../models/commentsModel')
const mongoose = require('mongoose');
router.get("/all", async (req, res) => {
    try {
        const summary = await Post.aggregate([
            {
                $lookup: {
                    // database name
                    from: "users",
                    //   Post field
                    localField: "createdBy",
                    //   users field
                    foreignField: "_id",
                    as: "Post_info"
                }
            },
            { $sort: { createdAt: -1 } }

        ])

        return res.status(200).json(summary);
        //    return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});

router.get("/:email", async (req, res) => {
    const userEmail = req.params.email
    try {
        const user = User.findOne({ email: userEmail })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});

router.post("/", async (req, res) => {

    try {
        const data = {
            postText: req.body.postText,
            createdAt: req.body.createdAt,
            imageUrl: req.body.imageUrl,
            createdBy: req.body.createdBy,
        }

        const postRef = Post.create(data)

        // Send response with updated user data
        return res.status(201).json({ data: postRef });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


//Like/Dislike Post
router.put("/like/:postId",async(req,res)=>{
    console.log(req.body.userId,req.body.isLike,req.params.postId)
    try{
       const postId=req.params.postId;
       const data={
        userId:req.body.userId,
        isLike:req.body.isLike
       }
        const post=await Post.findById(postId);
        if(!post.likes)
        {
            const updatePost=await Post.findByIdAndUpdate(postId,{likes:[]},
               { upsert:true,
                runValidators:true
                }
            );
            await updatePost.save();
        }
        const updatedPost=await Post.findById(postId);
        const conUserId =new mongoose.Types.ObjectId(data.userId);
        data.isLike
        ?updatedPost.likes.push(conUserId)
        :updatedPost.likes.pop(conUserId);
        const result=await updatedPost.save()
        res.status(201).json(result);
    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
})



router.get("/", async (req, res) => {
    
    try {
        const posts = await Post.find()
            .populate('createdBy') // Populate the createdBy field with user data
            .populate('likes') // Populate the likes field with user data
            .populate({ // Populate the comments field with comment data and user data for each comment
                path: 'comments',
                populate: {
                    path: 'createdBy',
                    model: 'User'
                }
            })
            .sort({ createdAt: -1 }) // Sort posts by createdAt field in descending order
    
        return res.status(200).send({ data: posts }); // Send the fetched and populated posts as a JSON response
    } catch (error) {
        return res.status(500).json({ message: error.message }); // Handle any errors that occur during the database operation
    }
});

module.exports = router;