const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    name : {
        type: String,
        default: ""
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        select: false
    },
    jti:{
        type: String
    },
    isVerified:{
        type: Boolean,
        default: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    isBlocked:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})


const user = mongoose.model('user', userModel);
module.exports = user;