var express = require('express');
var auth = require('./auth');
var model = require('../models/test');
var user = require('../models/user');
var zapps = require('./zapps');
var router = express.Router();

/*------------------------- GET home page. ----------------------- */ 
// TODO: send leader board datas
router.get('/', auth , (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.get('/lb/:q', (req, res, next)=>{
  model.findOne({"tname" : req.params.q })
    .then( table => {
      console.log(table);
      res.send(table.tcandidates);
    })
    .catch(e =>{
      console.log(e);
      res.statusCode = 403;
      res.end();
    })
});

router.get('/profile', auth, (req, res, next)=>{
    var username = req.session.username;
    if(username){
      user.findOne({"username" : username })
        .then( usr => {
          res.send({ "firstName" : usr.firstName, "lastName" : usr.lastName, "username": usr.username, "email" : usr.email,
              "tests" : usr.tests, "games" : usr.games
          })
        })
        .catch( err => {
          res.send("user missing from the database.")
        })
    }
    else{
      res.send("Not able to find your profile.")
    }
});

router.use('/zapps', auth,  zapps);

module.exports = router;
