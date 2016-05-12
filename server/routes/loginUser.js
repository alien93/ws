
module.exports = function(){
      
var router = require("./getRouter");
var mongoose = require("mongoose");

var User = mongoose.model('User');

function helpLogin(req, resp, userType){
    var userName = req.body.username;
    var pass = req.body.password;
    User.find({username : userName, type : userType}, function(err, user){
         if(user.length > 0){
              User.find({username : userName, password : pass, type : userType}, function(err, user){
                    if(user.length > 0){
                          req.session.user = user[0];
                          resp.end(JSON.stringify(user));
                    }else{
                          resp.status(500).end("Neispravna lozinka.");
                    }
              });
         }else{
               resp.status(500).end("Neispravno korisničko ime.");
         }
    });
}

/**
 * Logovanje administratora
 */
router.post('/adminLogin', function(req, resp){
    helpLogin(req, resp, "Administrator");
});

/**
 * Logovanje obicnog korisnika
 */
router.post('/userLogin', function(req, resp) {
    helpLogin(req, resp, "Programmer");
});

router.post('/registerUser', function(req, resp){
      var userName = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      if(userName.trim() == ""){
            resp.status(500).end("Korisničko ime je obavezno.");
            return;
      }else if(password.trim() == ""){
            resp.status(500).end("Lozinka je obavezna.");
            return;
      }else if(email.trim() == ""){
             resp.status(500).end("E-mail je obavezan.");
            return;
      }
      User.find({username : userName}, function(err, user){
         if(user.length > 0){
               resp.status(500).end("Već postoji korisnik sa ovim korisničkim imenom.");
               return;
         }
         User.find({email : email}, function(err, user){
                if(user.length > 0){
                  resp.status(500).end("Već postoji korisnik sa ovom e-mail adresom.");
                }else{
                      var newUser = new User();
                      newUser.username = userName;
                      newUser.password = password;
                      newUser.email = email;
                      newUser.type = 'Programmer';
                      newUser.save(function(err){
                         if(err){
                               resp.status(500).end("Greška na serveru. Pokušajte ponovo.");
                               return;
                         }
                         resp.end(JSON.stringify(newUser));   
                      });
                }
         });
      });
});

router.post('/logoutUser', function(req, resp){
   var user = req.session.user;
   if(user == null){
         resp.status(500).end("Niste ulogovani.");
   }else{
         req.user = null;
         resp.end("Korisnik je odjavljen.");
   }
});
router.get('/testGet', function(req, resp) {
      resp.end("Uspjeh");
      console.log(JSON.stringify(req.session.user));
});
}
