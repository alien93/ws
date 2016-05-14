var mongoose = require('mongoose'),
    models = require('./model');

var status = require('./status');
var priority = require("./priority");

mongoose.connect('mongodb://127.0.0.1/testQuery');

var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Task = mongoose.model('Task');
var Comment = mongoose.model('Comment');
var TaskVersion = mongoose.model('TaskVersion');

function proceed(projID, adminID, peraID, mikaID, djuraID) {
    console.log(peraID + " " + mikaID)
    var task1 = new Task();
    task1.code = "PROJ1_TASK1";
    task1.project = projID;
    var task1version = new TaskVersion();
    task1version.title = "Zadatak 1";
    task1version.description = "Opis";
    task1version.modifiedBy = adminID;
    task1version.assignedTo = peraID;
    task1version.status = status.TODO;
    task1version.priority = priority.CRITICAL;
    task1.taskVersions = [task1version];
    task1.save(function (err, updatedTask1) {
        User.findOneAndUpdate({ "username": "pera" }, { $push: { tasks: updatedTask1 } }, { new: true }, function (err, updatedPera) {
            Project.findOneAndUpdate(projID, { $push: { tasks: updatedTask1 } }, { new: true }, function (err, updatedProj) {


            });

        });
        /*Project.findOneAndUpdate(projID,{$push:{tasks:updatedTask1}},{new:true},function(err,updatedProj){
            console.log(err);
            console.log(updatedProj);
           User.findOneAndUpdate(peraID,{$push:{tasks:updatedTask1}},{new:true},function(err,updatedPera){
               console.log(err);
               console.log(updatedPera);
         
             }); 
        });
        */
    });
    
    /*
    var task2 = new Task();
    task2.code = "PROJ1_TASK2";
    task2.project = projID;
    var task2version = new TaskVersion();
    task2version.title = "Zadatak 2";
    task2version.description = "Opis 2 .. .. . ";
    task2version.modifiedBy = adminID;
    task2version.assignedTo = peraID;
    task2version.status = status.DONE;
    task2version.priority = priority.MINOR;
    task2.taskVersions = [task2version];
    task2.save(function(err,task2){
        Project.findOneAndUpdate(projID,{$push:{tasks:task2}},{new:true},function(err,updatedProj){
            console.log(err);
          User.findOneAndUpdate({"username":"pera"},{$push:{tasks:task2}},{new:true},function(err,updatedPera){
              console.log(err);
          }); 
       });
       console.log(err);
       console.log(task2);
    });
    */

    
    var task2 = new Task();
    task2.code = "PROJ1_TASK2";
    task2.project = projID;
    var task2version = new TaskVersion();
    task2version.title = "Zadatak 2";
    task2version.description = "Opis 2 .. .. . ";
    task2version.modifiedBy = adminID;
    task2version.assignedTo = peraID;
    task2version.status = status.IN_PROGRESS;
    task2version.priority = priority.MINOR;
    task2.taskVersions = [task2version];
    task2.save(function (err, task2) {
        Project.findOneAndUpdate(projID, { $push: { tasks: task2 } }, { new: true }, function (err, updatedProj) {
            console.log(err);
            User.findOneAndUpdate({ "username": "pera" }, { $push: { tasks: task2 } }, { new: true }, function (err, updatedPera) {
                console.log(err);

                var task2version2 = new TaskVersion();
                task2version2.title = "Zadatak 2 - IZMENA";
                task2version2.description = "Opis 2 .. .. . -- IZMENA";
                task2version2.modifiedBy = peraID;
                task2version2.assignedTo = djuraID;
                task2version2.status = status.DONE;
                task2version2.priority = priority.MINOR;
                Task.findOneAndUpdate({ "code": task2.code }, { $push: { taskVersions: task2version2 } }, { new: true }, function (err, updatedTask2) {
                    console.log(err);
                    console.log("TASK 2: " + updatedTask2);
                    User.findOneAndUpdate({ "_id": peraID }, { $pull: { tasks: task2._id } }, function (err, iz) {
                        console.log(err);
                        console.log(iz);
                        User.findOneAndUpdate({ "_id": djuraID }, { $push: { tasks: task2._id } }, { new: true }, function (err, updatedDjura) {
                            console.log(err);
                            console.log(updatedDjura);
                        })
                    })
                });

            });
        });
        //console.log(err);
        //console.log(task2);
    });
    

    var task3 = new Task();
    task3.code = "PROJ1_TASK3";
    task3.project = projID;
    var task3version = new TaskVersion();
    task3version.title = "Zadatak 3";
    task3version.description = "Opis 2 .. .. . ";
    task3version.modifiedBy = adminID;
    task3version.assignedTo = mikaID;
    task3version.status = status.DONE;
    task3version.priority = priority.MINOR;
    task3.taskVersions = [task3version];
    task3.save(function (err, task3) {
        Project.findOneAndUpdate(projID, { $push: { tasks: task3 } }, { new: true }, function (err, updatedProj) {
            console.log(err);
            User.findOneAndUpdate({ "username": "mika" }, { $push: { tasks: task3 } }, { new: true }, function (err, updatedMika) {
                console.log(err);
            });
        });
    });

}



var user1 = new User();
user1.username = "admin";
user1.type = "Administrator";
user1.email = "admin@email.com";
user1.password = "admin";
user1.save(function (err, user) { });

var user2 = new User();
user2.type = "Programmer";
user2.email = "pera@email.com";
user2.username = "pera";
user2.password = "pera";
user2.save(function (err, user) { });

var user3 = new User();
user3.type = "Programmer";
user3.email = "mika";
user3.username = "mika";
user3.password = "mika";
user3.save(function (err, user) { });

var user4 = new User();
user4.type = "Programmer";
user4.username = "djura";
user4.email = "djura";
user4.password = "djura";
user4.save(function (err, user) { });

User.findOne({ "username": "admin" }, function (err, adminUser) {
    console.log("Admin je: " + adminUser);

    var project = new Project();
    project.name = "Projekat 1";
    project.administrator = adminUser._id;
    project.save(function (err, project1) {
        User.findOneAndUpdate({ "username": "djura" }, { $push: { projects: project1 } }, { new: true }, function (err, djura) {
            Project.findOneAndUpdate(project1._id, { $push: { users: djura } }, { new: true }, function (err, updatedProj) {
                User.findOneAndUpdate({ "username": "pera" }, { $push: { projects: updatedProj } }, { new: true }, function (err, updatedPera) {
                    Project.findOneAndUpdate(updatedProj._id, { $push: { users: updatedPera } }, { new: true }, function (err, updatedProj) {
                        User.findOneAndUpdate({ "username": "mika" }, { $push: { projects: updatedProj } }, { new: true }, function (err, updatedMika) {
                            Project.findOneAndUpdate(updatedProj._id, { $push: { users: updatedMika } }, { new: true }, function (err, updatedProj) {
                                console.log(err);
                                proceed(updatedProj._id, adminUser._id, updatedPera._id, updatedMika._id, djura._id);
                            });
                        });
                    });
                });
            });
        });
    });


});

