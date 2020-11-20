var model_user = require('../models/user');
var model_test = require('../models/test');
var model_game = require('../models/games');
// var model_discuss = require('../models/discuss');
var model_quest = require('../models/questions');
var mongoose = require('mongoose');
var conf = require('../conf');

var usr1 = {"firstName": "Devidutta", "lastName": "Nayak", "username": "devi_D", "email": "me.devid18@gmail.com", "password": "12345" };
var usr2 = {"firstName": "Babu", "lastName": "Bhaiya", "username": "rajuBoi", "email": "me2.devid18@gmail.com", "password": "2345688" };

var test1 = {"tname":"t1", "tquestionsID" : [1,2,3,4,5], "tcandidates" : [{"username": "devi_D", "score": 4, "time" : 1},
                                                                         {"username": "rajuBoi", "score": 5, "time" : 1.2 }] };

var quest = [{ "qid" : 3, "qbody" : "JavaScript is written on which language?", 
            "qoptions" : ["java", "C/C++","html", "python"], "qanswer" : ["C/C++"] } , 
            { "qid" : 4, "qbody" : "Python needs compiler to run?", 
            "qoptions" : ["True", "False", "partial True", "partial False"], "qanswer" : ["False"] },
            { "qid" : 5, "qbody" : "Fastest animal?", 
            "qoptions" : ["horse", "cheetah","dog", "python"], "qanswer" : ["cheetah"] } 
        ];

// mongodb-connection
/*
mongoose.connect( conf.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if(err){
      console.log(err);
    }
    else {
        console.log("Connected to mongodb. Ok.")
        // var user = model_quest(quest);
        model_quest.insertMany( quest)
            .then( r => {
                console.log(r);
            })
            .catch( e =>{
                console.log(e);
            });
        console.log("end");
    }
  });
*/
