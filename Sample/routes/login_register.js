var express = require('express');
const { ConnectionStates } = require('mongoose');
var conf = require('../conf');
var model = require('../models/user');

var router = express.Router();

// Route => /api/auth/signup
router.post('/signup', (req, res, next) => {
  // console.log("signup"); console.log(req.body);
  var newUser = model(req.body);
  newUser.save()
    .then( usr => {
      // console.log(usr);
      res.send('received');
    })
    .catch( err => {
      if(err.code === 11000){
        res.statusCode = 202;
        res.send("Given " + Object.keys(err.keyPattern)[0] + ' has already registered!! Give a new one.');
      }
      else{
        res.statusCode = 500; res.end();
      }
    })
});

// Route => api/auth/login
router.post('/login', (req, res, next) => {
  // console.log(req.body); console.log(req.session);
  model.findOne({'email' : req.body.email, 'password' : req.body.password})
    .then( usr => {
      // console.log(usr);
      if(usr === null){
        res.statusCode = 200;
        res.send('Account not found');
      }
      else if( usr.password === req.body.password){
        req.session.key = conf["session-key"];
        req.session.username = usr.username;
        res.send('Successfully logged in.');
      }
      else{
        // res.statusCode = 403;
        res.send('Password didn\'t match');
      }
      
    })
    .catch( err => {
      console.log("error");
      res.send('didn\'t find your account');
    })
});

router.get('/status', (req, res, next) => {
    // console.log("status"); console.log(req.session);
    if(req.session.key===conf["session-key"]){
        res.send(req.session.username);
    }
    else {
        res.statusCode = 403;
        res.end();
    }
});

router.get('/logout', (req, res, next) => {
    // console.log("logout"); console.log(req.session);
    req.session.destroy();
    res.end();
});

/*
// passport----------------------------------- makes authentication much easier
router.post('/passport/login', passport.authenticate('local'), (req,res,next)=> {
  console.log("login-request");
  console.log(req.session);
  res.statusCode = 200;
  res.json({statu: 'you are logged in.'});
});

router.post('/passport/signup', (req,res,next)=> {
  console.log("signup-req");
  console.log(req.session)
  model.register(new model({username : req.body.username}), req.body.password,
    (err, usr) => {
      if(err){
        res.statusCode = 500;
        res.json({err: err});
      }
      else{
        console.log("else-part");
        passport.authenticate('local') (req, res , () => {
        res.statusCode = 200;
        res.json({sucess: true, status:'registered'});
        })
      }
    } )
})

// session based auth are not scalable as they have to keep a session info. 
// token based auth :)
// issue with token need to mount somewhere in req

// jwt-token -- need way to mount jwt token to incomming request 1) use custom http request header 2) searching...
router.post('/jwt/login', passport.authenticate('local'), (req,res,next)=>{
  // TODO
  console.log(req.user);
  console.log("jwt-token-request");
  var token = authenticate.getToken({_id : req.user._id});
  res.send("success!! token: ",token);
})

router.post('/jwt/signup', (req,res,next)=>{
  // TODO
  console.log("signup-req-jwt");
  console.log(req.session)
  model.register(new model({username : req.body.username}), req.body.password,
    (err, usr) => {
      if(err){
        res.statusCode = 500;
        res.json({err: err});
      }
      else{
        console.log("else-part");
        passport.authenticate('local') (req, res , () => {
        res.statusCode = 200;
        res.json({sucess: true, status:'registered'});
        })
      }
    } )
})

*/

module.exports = router;
