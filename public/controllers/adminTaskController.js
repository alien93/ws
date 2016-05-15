angular.module('tsApp')
        .controller('adminTaskController', function($scope, $routeParams){
            var idProj = $routeParams.idProj;
            var idTask = $routeParams.idTask;
            
            //-------------------test data------------------
            var contributors  = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
	    var taskContributor = {"name": "Pera Peric"};
            var comment1 = {"author":"Pera Peric", "commentDate":"25.5.2016.","content":"Komentar1"};
            var comment2 = {"author":"asdf123", "commentDate":"26.5.2016.","content":"Komentar2"};
	    var tasks = [{"name":"Task1", "contributor": taskContributor, "percentage": 30,
                          "status":"To Do", "description":"Task1 description", "comments": [comment1, comment2]}, 
			 {"name":"Task2","contributor": taskContributor, "percentage": 50,
                          "status":"To Do", "description": "Task2 description", "comments": [comment1]}];
	    var project = {"name" : "proj1", "contributors" : contributors, "tasks":tasks};
            //-------------------\test data------------------
            $scope.projects = [project];
            
            $scope.task = $scope.projects[idProj].tasks[idTask];		
            
            console.log($scope.task);
        });