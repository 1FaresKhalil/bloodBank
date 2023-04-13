const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bloodType:{
        type: String,
        required: true,
    },
    isAdmin: Boolean,
    age: Number,
    address: String,
    nationalId: String,
    gender: String,
    phone: String,
});

module.exports = mongoose.model('users',userSchema);