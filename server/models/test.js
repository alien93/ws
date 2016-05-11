var mongoose = require('mongoose'),
 	models = require('./model');




mongoose.connect('mongodb://127.0.0.1/testDB');

var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Task = mongoose.model('Task');
var Comment = mongoose.model('Comment');
var TaskVersion = mongoose.model('TaskVersion');
var Team = mongoose.model('Team');

/* TEST 1 */
var user1 = new User();
user1.type = "Administrator";
user1.username = "pera";
user1.password = "123456";
user1.email = "pera@email.com";
user1.save(function(err,entry){
	
	var adminUser = entry;
	var project1 = new Project();
	project1.name = "Prvi Projekat";
	project1.administrator = adminUser;
	
	project1.save(function(err,entry){
		
		var proj = entry;
		
		var task1 = new Task();
		task1.code = "PRVI TASK";
		
		task1.save(function(err,entry){
			
			var tsk = entry;
			
			var taskVersion1 = new TaskVersion();
			taskVersion1.title = "Prvi Naslov";
			taskVersion1.description = "Prvi Opis";
			taskVersion1.modifiedBy = adminUser;
			taskVersion1.status = {name:'To Do',value:1};
			taskVersion1.priority = {name:'Blocking',value:4};
			
			taskVersion1.save(function(err,taskVer){
				Task.findByIdAndUpdate(tsk._id,{$push:{'taskVersions':taskVer}},function(err,task){
					console.log(err);
					console.log(task);
				
					var foundTask = Task.findOne({'_id':task._id},function(err,entry){
						Project.findByIdAndUpdate(proj._id,{$push:{'tasks':entry}},function(err,proj){
						console.log(err);
						console.log(proj);
					});
					});

				
				});
			});
			
			
			
		});
		

		
			
		
	});
	
});


/*   TEST 2 */
/*
var user1 = new User();
user1.type = "Administrator";
user1.username = "pera";
user1.password = "123456";
user1.email = "pera@email.com";
user1.save(function(err,entry){
	
	var project1 = new Project();
	project1.name = "Neki Projekat";
	project1.administrator = entry;
	var task1 = new Task();
	task1.code = "PRVI TASK";
	var taskVersion1 = new TaskVersion();
	taskVersion1.title = "Prvi Naslov";
	taskVersion1.description = "Prvi Opis";
	taskVersion1.modifiedBy = entry;
	taskVersion1.status = {name:'To Do',value:1};
	taskVersion1.priority = {name:'Blocking',value:4};
	
	var taskVersion2 = new TaskVersion();
	taskVersion2.title = "Promenjeni Naslov";
	taskVersion2.modifiedBy = entry;
	taskVersion2.description = "Promenjeni Opis";
	taskVersion2.status = {name:'In Progress',value:2};
	taskVersion2.priority = {name:'Critical',value:3};
	
	task1.taskVersions = [taskVersion1,taskVersion2];
	project1.tasks = [task1];
	
	project1.save(function(err,entry){
		console.log(entry);
		console.log(err);
		
	});
});
*/
