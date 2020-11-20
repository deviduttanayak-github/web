const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const game = new Schema({
    gname :{
        type : String,
        required : true,
        unique : true,
    },
    gcandidates : {
        type : Array,
    },
},
    {
        timestamps : true
});

var Game = mongoose.model('Game',game);

module.exports = Game;
