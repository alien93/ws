
module.exports = function(){

var router = require("./getRouter");
var mongoose = require("mongoose");

var TaskVersion = mongoose.model('TaskVersion');
var Task = mongoose.model('Task');
var Project = mongoose.model('Project');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');

var Priority = require("../models/priority");
var Status = require("../models/status");

router.post('/createTask', function(req, resp){
      var projectId = "57363c97763726a544bae5e3";
      var userId = "57363b83f2114eb55b75376d";//req.session.user;
      var title = "Novi zadatak";
      var description = "Neki opis";
      var status = Status.TODO;
      var priority = Priority.BLOCKER;
      var assignedTo = "57363b97f2114eb55b75376f";
      
      /*
      var projectId = req.body.projectId;
      var user = req.session.user;
      if(user.type == "Programmer"){
            if(user.projects.indexOf(projectId) == -1){
                  resp.status(500).end("Nemate pravo da kreirate zadatak na ovom projektu.");
                  return;
            }
      }
      var title = req.body.title;
      var description = req.body.description;
      var status = req.body.status;
      var priority = req.body.priority;
      var assignedTo = req.body.assignedTo ? req.body.assignedTo : null;
      */
      Project.findOne({_id : projectId}, function(err, project){
                  
            var code = project.name + "" + project.tasks.length;
            var newTaskVersion = new TaskVersion({
                  title : title,
                  description : description,
                  modifiedBy : userId,
                  assignedTo : assignedTo,
                  status : status,
                  priority : priority,
                  comments : []
            });
            var newTask = new Task({
                  code : code,
                  project : project._id,
                  taskVersions : [newTaskVersion]
            }); 
            newTask.save(function(err, savedTask){
               if(err){
                     resp.status(500).end("Greska na serveru.")
               }else{
                     project.tasks.push(savedTask._id);
                     Project.update({_id : project._id}, project, function(err, savedProject){
                           if(err){
                                  resp.status(500).end("Greska na serveru.")
                            }else{
                                  if(assignedTo){
                                        User.findOne({_id : assignedTo}, function(err, user){
                                           user.tasks.push(savedTask._id);
                                           User.update({_id : assignedTo}, user, function(err){
                                                resp.end(JSON.stringify(savedTask));              
                                           });
                                        });
                                  }else{
                                        resp.end(JSON.stringify(savedTask)); 
                                  }
                            }
                     });
               }
            });
      });
});

router.post('/modifyTask', function(req, resp){
      var task = req.body.task;
      
      Task.update({_id : task._id}, task, function(err, modfiedTask){
            
      });
});

router.post('/removeTask', function(req, resp){
      
      var taskId = req.body.taskId;
      
      Task.findOne({_id : taskId}, function(err, task){
         Task.remove({_id : task._id}, function(err){
            Project.findOne({_id : task.project}, function(err, project){
                  var ind = project.tasks.indexOf(task._id);
                  project.tasks.splice(ind, 1);
                  Project.update({_id : project._id}, project, function(err){
                        if(task.assignedTo){
                              User.findOne({_id : assignedTo}, function(err, user){
                                    var ind = user.tasks.indexOf(task._id);
                                    user.tasks.splice(ind, 1);
                                    User.update({_id : assignedTo}, user, function(err){
                                          resp.end(JSON.stringify(task));              
                                    });
                              });
                        }else{
                              resp.end(JSON.stringify(task));  
                        }
                  });
            });
          });
      });
     
});

router.post('/taskFilter', function(req, resp){
      
});

var insertComment = function(comments, newComment, parentCommentId){
      for(var i = 0; i < comments.length; i++){
            if(comments[i]._id == parentCommentId){
                  comments[i].comments.push(newComment);
                  break;
            }else{
                  insertComment(comments[i].comments, newComment, parentCommentId);
            }
      }
}

router.post('/addComment', function(req, resp){
      var content = req.body.content;
      var taskId = req.body.taskId;
      var author = req.session.user._id;
      var parentCommentId = req.body.parentCommentId;
      var newComment = new Comment({
            author : author,
            content : content,
            comments : []
      });
      Task.findOne({_id : taskId}, function(err, task){
         var lastTaskVersion = task.taskVersions[task.taskVersions.length - 1];
         if(parentCommentId){
               insertComment(lastTaskVersion.comments, newComment, parentCommentId);
         }else{
                lastTaskVersion.comments.push(newComment);
         }
            Task.update({_id : taskId}, task, function(err){
                  resp.end(JSON.stringify(newComment));
            });
      });
});

router.post('/removeComment', function(req, resp){
      
});

router.post('/modifyComment', function(req, resp){
      
});

router.get('/getProjects', function(req, resp){
      var user = req.session.user;
      Project.find({}, function(err, projects){
            if(user.type == "Administrator"){
                  resp.end(JSON.stringify(projects));      
            }else{
                  var userProjects = [];
                  for(var i = 0; i < projects.length; i++){
                        if(user.projects.indexOf(projects[i]._id) != -1){
                              userProjects.push(projects[i]);
                        }
                  }     
                  resp.end(JSON.stringify(userProjects));
            }
      });
});

}