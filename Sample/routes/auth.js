var conf = require('../conf'); 
/* --------------- authentication --------------*/
/*
    presently used : session based
    improvement : token-based
*/

const sessionAuth = (req, res, next) => {
    // console.log("sessionauth : ", req.session);
    if(req.session.key){
        if(req.session.key===conf["session-key"]){
            // console.log("has :", req.session.username);
            next();
        }
        else {
            res.statusCode = 404; res.end();
        }
    }
    else {
        // console.log("no session found");
        res.redirect('/login');
    }

};

module.exports = sessionAuth;
