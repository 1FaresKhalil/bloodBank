const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloodRequestsSchema = new Schema({
    patientName: {
        type: String,
        required: true,
    },
    bloodType:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    nearestHospital:{
        type: String,
        required: true,
    },
    note: String,
    phone: String,
    done: Boolean,
    username: String,
    date:String
});

module.exports = mongoose.model('bloodRequests',bloodRequestsSchema);