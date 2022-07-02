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
    jti:{                                  // for handling number of sessions
        type: String
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