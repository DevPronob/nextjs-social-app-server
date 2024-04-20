const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Corrected spelling of "required"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model("User", userSchema);