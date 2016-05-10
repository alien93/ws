angular.module('tsApp')
		//user dashboard
		.controller('userDashboardController', ['$scope',
			function($scope){
				$scope.taskStatus = [ "To do", "In progress", "Verify", "Done"];
				$scope.projects = [ 
					{name: "Project1", status: "To do"}, 
					{name: "Project2", status: "To do"}
				];
			}
		]);
