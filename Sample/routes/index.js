var express = require('express');
var auth = require('./auth');
var model = require('../models/test');
var user = require('../models/user');
var posts = require('../models/discuss');
var zapps = require('./zapps');
const { route } = require('./zapps');
var router = express.Router();

/*------------------------- GET home page. ----------------------- */ 
// TODO: send leader board datas
router.get('/', auth , (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.get('/all-users', (req, res, next)=>{
  user.find({}, {'username' : 1, '_id' : 0})
    .then( u =>{
      console.log(u);
      res.send(u);
    })
    .catch( e =>{
      console.log(e)
      res.send('unable to fetch');
    })
});

router.get('/lb/:q', (req, res, next)=>{
  model.findOne({"tname" : req.params.q })
    .then( table => {
      // console.log(table);
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

router.get('/posts', (req, res, next)=>{
  // console.log("posts-req")
  posts.find({})
    .then( ps => {
      res.send(ps);
    })
    .catch(e=>{
      res.statusCode = 500;
      res.end();
    })
});

router.post('/reply', (req,res,next)=>{
  posts.update({"topic_id":req.body.id}, { $push : { "replies" : req.body.data } })
    .then( ps =>{
      res.send("reply-added. refresh to see changes");
    })
    .catch(e=>{
      res.send("something went wrong");
    })
});

router.post('/add-post', auth, (req, res, next)=>{
  var uname = req.session.username;
  if(uname){
    var newpost = posts(req.body)
    newpost.save()
      .then( p =>{
        res.send("successfully added. Refresh to see.")
      })
      .catch( e=>{
        res.statusCode = 500;
        res.end();
      })
  }
  else{
    res.statusCode = 403;
    res.end();
  }
} );


// --------------- routes ro z-apps ---------------
router.use('/zapps', auth,  zapps);

module.exports = router;
