const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QnAformat = new Schema({
    qid : {
        type: Number,
        required: true
    },
    qbody : {
        type: String,
        required : true
    },
    qoptions: {
        type : Array,
        required: true
    },
    qanswer : {
        type : Array,
        required : true
    }
},
    {
        timestamps : true
});

var qformat = mongoose.model('QnAformat', QnAformat);

module.exports = qformat;
