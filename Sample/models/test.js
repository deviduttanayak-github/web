const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const test = new Schema({
    tname :{
        type : String,
        required : true,
        unique : true,
    },
    tquestionsID : {
        type : Array, 
    },
    tcandidates : {
        type : Array,
    },
},
    {
        timestamps : true
});

var Test = mongoose.model('Test',test);

module.exports = Test;
