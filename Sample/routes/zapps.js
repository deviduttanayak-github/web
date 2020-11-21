var express = require('express');
var model = require('../models/questions');
var test_model = require('../models/test'); 
var router = express.Router();

/* GET users listing. */
router.get('/quize/:q', function(req, res, next) {
  var test_id = req.params.q;
  // console.log("test ", test_id);
  test_model.findOne( {"tname" : test_id})
    .then( test => {
      // console.log(test);
      var q_arr = test.tquestinsID;
      var res_q = [];
      model.find({})
        .then( quest_ar => {
          quest_ar.forEach( quest => {
            res_q.push( { 'qid':quest.qid, 'question':quest.qbody, "options":quest.qoptions } )
          });
          res.send(res_q);
        })
        .catch( er => {
          res.statusCode = 403;
          res.end()
        })
    })
    .catch( e => {
      res.statusCode = 403;
      res.end();
    })
});

router.post('/submit-answers', (req,res,next)=>{
  var user_res = req.body;
  // console.log(user_res);
  model.find({} , (err, questions )=>{
      if(err) {
          console.log(err);
          res.statusCode = 500;
          res.end();
      }
      if(questions){
          var score = 0;
          user_res.forEach( ele => {
              // console.log(ele);
              questions.forEach( qu => {
                  if(ele.qid == qu.qid && ele.ans==qu.qanswer[0]) score++;
              });
          });
          test_model.updateOne({"tname": "t1"}, { $push : { "tcandidates" : { "username" : req.session.username, "score" : score, "time" : 2 } } } )
            .then( test => {
              // console.log(test);
              res.send("Your Score is "+score);
            })
            .catch( e => {
              console.log(e);
            })
      }
      else {
          res.send("Null questions");
      }
  })

});



module.exports = router;
