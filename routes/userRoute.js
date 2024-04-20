const express = require("express");
const router = express.Router();
const User = require('../models/userModel')
router.get("/", async (req, res) => {
    try {
        const users = User.find()
       return res.status(200).json(users)
    } catch (error) {
       return res.status(500).json({message:error.message})
    }
});


router.get("/:email", async (req, res) => {
    const userEmail =req.params.email
    try {
        const user =await User.findOne({email:userEmail})
       return res.status(200).json(user)
    } catch (error) {
       return res.status(500).json({message:error.message})
    }
});


router.post("/", async (req, res) => {
   
    try {
        const data ={
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
        }

        // Perform findOneAndUpdate operation
        const userRes = await User.findOneAndUpdate(
            { email: req.body.email }, // Filter to find existing user by email
            data, // Data to update or insert
            { 
                new: true, // Return updated document
                upsert: true, // Create new document if not found
                runValidators: true // Run validators on update
            }
        );

        // Send response with updated user data
       return res.status(201).json(userRes);
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
});


module.exports = router;