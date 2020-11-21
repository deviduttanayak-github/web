const mongoose = require('mongoose');

var Schema =  mongoose.Schema;

const topic = new Schema({
    topic_id : {
        type : String,
        unique : true
    },
    writer : {
        type : String,
        required: true
    },
    topic : {
        type : String,
        required : true
    },
    replies : {
        type : Array
    }
},
{
    timestamps : true
});

var Topic = mongoose.model("Topic", topic);

module.exports = Topic;

