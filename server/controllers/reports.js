/* standalone  otkomentarisi ako pokreces kao standalone, a ako pokreces iz app.js onda zakomentarisi*/
/*
var mongoose = require('mongoose'),
    models = require('./model');

mongoose.connect('mongodb://127.0.0.1/testQuery');

*/

/*app.js zakomentarisi ako pokreces kao standalone*/
var mongoose = require('mongoose');


var status = require('../models/status');
var priority = require("../models/priority");

/* MODULE */

var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Task = mongoose.model('Task');
var TaskVersion = mongoose.model('TaskVersion');


/**
 * Funkcije: @getPercentagePerProjectId i @getPercentagePerProjectName vracaju objekat:
 * {
 *     project:{
 *          _id:"id od projekta",
 *          name:"Naziv projekta"           
 *     },
 *     users:
 *          [
 *             {
 *                 _id:"id od usera",
 *                 username:"Username",
 *                 percentage:"Procenat zadataka" 
 *             },
 *             {
 *             .....
 *             } 
 *          ]
 * }
 */
var PercentagePerProject = (function () {

    var calculatePercentage = function (project, callback) {
        Task.find({ "project": project._id }, function (err, taskovi) {

            var taskNum = taskovi.length;
            var usersID = {};
            //console.log(project.users);
            for (var u in project.users) {
                usersID[project.users[u]] = 0;
            }
            for (var i = 0; i < taskNum; i++) {
                var task = taskovi[i];

                var lastTaskVersion = task.taskVersions[task.taskVersions.length - 1];
                //console.log(lastTaskVersion);
                usersID[lastTaskVersion.assignedTo]++;
            }

            var retVal = {};
            retVal.project = { "_id": project._id, "name": project.name };
            retVal.users = [];

            User.find({ "_id": { $in: project.users } }, function (err, found) {
                for (var i in found) {
                    var user = found[i];
                    var percentage = usersID[user._id] / taskNum * 100;
                    var obj = { "_id": user._id, "username": user.username, "percentage": percentage }
                    retVal.users.push(obj);
                }
                //console.log(retVal);
                callback(retVal);
            });
        });
    }

    return {
        getPercentagePerProjectId: function (projectID, callback) {
            Project.findOne({ "_id": projectID }, function (err, project) {
                if (err) throw err;
                calculatePercentage(project, callback);
            });
        },
        getPercentagePerProjectName: function (projectName, callback) {
            Project.findOne({ "name": projectName }, function (err, project) {
                if (err) throw err;
                calculatePercentage(project, callback);
            });
        }
    }

})();

/*test */
var test = (function () {
    return {
        hello: function () { console.log("Hello!") }
    }
})();
module.exports = PercentagePerProject;
module.exports = test;
/******* */

/*Prvobitni query --- Ne brisi, ispravan je*/
/*
var query1 = function () {
    Project.findOne({ "name": "Projekat 1" }, function (err, projekat) {

        Task.find({ "project": projekat._id }, function (err, taskovi) {

            var taskNum = taskovi.length;
            var usersID = {};
            console.log(projekat.users);
            for(var u in projekat.users){
                usersID[projekat.users[u]] = 0;
            }
            for (var i = 0; i < taskNum; i++) {
                var task = taskovi[i];
                
                var lastTaskVersion = task.taskVersions[task.taskVersions.length - 1];
                console.log(lastTaskVersion);
                usersID[lastTaskVersion.assignedTo]++;
            }
            
            var retVal = {};
            retVal.project ={"_id":projekat._id,"name":projekat.name};
            retVal.users = [];

            User.find({"_id":{$in:projekat.users}},function(err,found){
               for(var i in found){
                   var user = found[i];
                   var percentage = usersID[user._id]/taskNum*100;
                   var obj = {"_id":user._id,"username":user.username,"percentage":percentage}
                   retVal.users.push(obj);
               }
               //console.log(retVal);
               //return retVal;
            });
        });
    });

}

query1();
*/

/*TEST ZA MODUL */
/*
PercentagePerProject.getPercentagePerProjectName("Projekat 1",function(data){
    console.log(data);
});
*/