const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type: String,
        required: true,
        unique : true,
    },
    password : {
        type: String,
        required : true,
        password : true,
    },
    tests : {
        type : Array,
        required : false,
    },
    games : {
        type : Array,
        required : false,
    },
    admin : {
        type : Boolean,
        default : false,
    }
},
    {
        timestamps : true
});

var User = mongoose.model('User',user);

module.exports = User;
