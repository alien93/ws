
module.exports = function(){

var router = require("./getRouter");
var mongoose = require("mongoose");

var Project = mongoose.model('Project');
var User = mongoose.model('User');

function checkUser(req, type){
      var retVal = "OK";
      if(!req.session.user){
            retVal = "Niste ulogovani";
      }else if(req.session.user.type != type){
            retVal = "Nemate pravo da izvršite ovu akciju.";
      }
      return retVal;
}

/**
 * Kreiranje novog projekta
 */
router.post('/createProject', function(req, resp){  
      var check = checkUser(req, "Administrator");
      if(check != "OK"){
            resp.status(500).end(check);
            return;
      }
     
      var projectName = req.body.name;
      var newProject = new Project();
      newProject.name = req.body.name;
      if(newProject.name.trim() == ""){
            resp.status(500).end("Ime projekta nije zadato.");
            return;
      }
      newProject.administrator = req.session.user._id;
      Project.find({name : newProject.name}, function(err, projects){
         if(projects.length == 0){
            newProject.save(function(err, project){
                  if(err){
                        resp.status(500).end("Greška na serveru.");
                  }else{
                         resp.end(JSON.stringify(project));
                  }
            });      
         }else{
               resp.status(500).end("Ime projekta mora biti jedinstveno.");
         }   
      });
});

/**
 * Dodavanje novog korisnika na projekat
 */
router.post('/addUserToProject', function(req, resp){
      
      var check = checkUser(req, "Administrator");
      if(check != "OK"){
            resp.status(500).end(check);
            return;
      } 
      
      var userId = req.body.userId;
      var projectId = req.body.projectId;
      User.findOne({_id : userId}, function(err, user){
            if(!user){
                  resp.status(500).end("Nepoznati korisnik.");
                  return;
            }
            Project.findOne({_id : projectId}, function(err, project) {
                  if(!project){
                        resp.status(500).end("Nepoznati projekat.");
                        return;
                  }
                  user.projects.push(project._id);
                  User.update({_id : userId}, user, function(err){
                        project.users.push(user._id);
                        Project.update({_id : projectId}, project, function(err){
                              resp.end(JSON.stringify(user));
                        });
                  });
            });
      });
});

/**
 * Uklanjanje korisnika sa projekta
 */
router.post('/removeUserFromProject', function(req, resp){
      
      var check = checkUser(req, "Administrator");
      if(check != "OK"){
            resp.status(500).end(check);
            return;
      }
      
      var userId = req.body.userId;
      var projectId = req.body.projectId;
      User.findOne({_id : userId}, function(err, user){
            if(!user){
                  resp.status(500).end("Nepoznati korisnik.");
                  return;
            }
            Project.findOne({_id : projectId}, function(err, project) {
                 if(!project){
                       resp.status(500).end("Nepoznati projekat.");
                       return;
                  }
                  var ind = project.users.indexOf(user._id);
                  if(ind != -1) project.users.splice(ind, 1);
                  ind = user.projects.indexOf(project._id);
                  if(ind != -1) user.projects.splice(ind, 1);
                  User.update({_id : userId}, user, function(err){
                        Project.update({_id : projectId}, project, function(err){
                              resp.end(JSON.stringify(user));
                        });
                  });
            });
      });
});

}