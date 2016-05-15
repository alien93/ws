
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

function getNewTaskVersion(req){
      var user = req.session.user;
      var title = req.body.title;
      var description = req.body.description;
      var status = Status.TODO;//req.body.status;
      var priority = req.body.priority ? {"name":
                                        req.body.priority, "value": Priority.getValueByName(req.body.priority)}
                                        : Priority.BLOCKER;//req.body.priority;
      var assignedTo = req.body.assignedTo ? req.body.assignedTo : null;
      var newTaskVersion = new TaskVersion({
                  title : title,
                  description : description,
                  modifiedBy : user._id,
                  assignedTo : assignedTo,
                  status : status,
                  priority : priority,
                  comments : []
      });
      return newTaskVersion;
}

router.post('/createTask', function(req, resp){
      
      var projectId = req.body.projectId;
      var user = req.session.user;
      if(user.type == "Programmer"){
            if(user.projects.indexOf(projectId) == -1){
                  resp.status(500).end("Nemate pravo da kreirate zadatak na ovom projektu.");
                  return;
            }
      }
      /*
      var title = req.body.title;
      var description = req.body.description;
      var status = Status.TODO;//req.body.status;
      var priority = Priority.BLOCKER;//req.body.priority;
      var assignedTo = req.body.assignedTo ? req.body.assignedTo : null;
      */
      Project.findOne({_id : projectId}, function(err, project){
            
            if(err) throw err;
            
            var code = project.name + "" + project.counter++;
           /* var newTaskVersion = new TaskVersion({
                  title : title,
                  description : description,
                  modifiedBy : user._id,
                  assignedTo : assignedTo,
                  status : status,
                  priority : priority,
                  comments : []
            });*/
            var newTaskVersion = getNewTaskVersion(req);
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
                                  var assignedTo = newTaskVersion.assignedTo;
                                  if(assignedTo){
                                        User.findOne({_id : assignedTo}, function(err, user){
                                           if(user.projects.indexOf(project._id) != -1){
                                                user.tasks.push(savedTask._id);
                                                User.update({_id : user._id}, user, function(err){
                                                       resp.end(JSON.stringify(savedTask));              
                                                });
                                           }else{
                                                 resp.end(JSON.stringify(savedTask)); 
                                           }
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
      var newTaskVersion = getNewTaskVersion(req);
      var taskId = req.body.taskId;
      Task.findOne({_id : taskId}, function(err, task){
            task.taskVersions.push(newTaskVersion);
            Task.update({_id : taskId}, task, function(err){
               if(err) throw err; 
               else{
                     resp.end(JSON.stringify(newTaskVersion));
               }  
            });
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
                        if(task.taskVersions[task.taskVersions.length - 1].assignedTo){
                              User.findOne({_id : task.taskVersions[task.taskVersions.length - 1].assignedTo}, function(err, user){
                                    var ind = user.tasks.indexOf(task._id);
                                    user.tasks.splice(ind, 1);
                                    User.update({_id : user._id}, user, function(err){
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
      var taskId = req.body.taskId;
      var commentId = req.body.commentId;
      var taskVersionId = req.body.taskVersionId;
      Task.findOne({_id : taskId}, function(err, task){
         modifyComment(task, null, commentId, taskVersionId, true);
         Task.update({_id : taskId}, task, function(err){
            if(err) throw err;   
            else{
                  resp.end(JSON.stringify(task));
            }
         });
      });
});

function helpModifyComment(comments, commentId, newContent, flagRemove){
      var indRemove = -1;
      for(var i = 0; i < comments.length; i++){
            if(comments[i]._id == commentId){
                  if(flagRemove) indRemove = i;
                  else comments[i].content = newContent;
                  break;
            }else{
                  helpModifyComment(comments[i].comments, commentId, newContent);
            }
      }
      if(indRemove != -1) comments.splice(indRemove, 1);
}

function modifyComment(task, newContent, commentId, taskVersionId, flagRemove){
     for(var i = 0; i < task.taskVersions.length; i++){
           if(task.taskVersions[i]._id == taskVersionId){
                  helpModifyComment(task.taskVersions[i].comments, commentId, newContent, flagRemove);
                  break;
           }
     }
}

router.post('/modifyComment', function(req, resp){
      var newContent = req.body.content;
      var taskId = req.body.taskId;
      var commentId = req.body.commentId;
      var taskVersionId = req.body.taskVersionId;
      Task.findOne({_id : taskId}, function(err, task){
         modifyComment(task, newContent, commentId, taskVersionId, false);
         Task.update({_id : taskId}, task, function(err){
            if(err) throw err;   
            else{
                  resp.end(JSON.stringify(task));
            }
         });
      });
});

router.get('/getProjects', function(req, resp){
      var user = req.session.user;
      Project.find({}, function(err, projects){
            var userProjects = [];
            if(user.type == "Administrator"){
                  userProjects = projects;      
            }else{
                  for(var i = 0; i < projects.length; i++){
                        if(user.projects.indexOf(projects[i]._id) != -1){
                              userProjects.push(projects[i]);
                        }
                  }     
            }
             resp.end(JSON.stringify(userProjects));
      });
});

router.post('/getTasksForProject', function(req, resp){
   var projectId = req.body.projectId;
   var index = req.body.index;
   var tasks = [];
   Project.findOne({_id : projectId}, function(err, project){
      if(project.tasks.length == 0){
            resp.end(JSON.stringify({index:index, tasks:tasks}));
            return;
      }
      for(var i = 0; i < project.tasks.length; i++){
            Task.findOne({_id : project.tasks[i]}, function(err, task){
                  tasks.push(task);
                  if(tasks.length == project.tasks.length){
                        resp.end(JSON.stringify({index:index, tasks : tasks}));
                  }
            })
      }   
   });
});

router.post('/getUsersForProject', function(req, resp){
   var projectId = req.body.projectId;
   var index = req.body.index;
   var users = [];
   Project.findOne({_id : projectId}, function(err, project){
      if(project.users.length == 0){
            resp.end(JSON.stringify({index:index, users:users}));
            return;
      }
      for(var i = 0; i < project.users.length; i++){
            User.findOne({_id : project.users[i]}, function(err, user){
                  if(user) users.push(user);
                  if(users.length == project.users.length){
                        resp.end(JSON.stringify({index:index, users:users}));
                  }
            });
      }   
   });
});

}