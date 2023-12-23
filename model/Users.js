const mongoose = require("mongoose");

const Users = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [80, "Name can't exceed 80 characters"],
        minLength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        maxLength: [100, "Email can't exceed 100 characters"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', Users, 'users');
