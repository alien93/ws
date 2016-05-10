angular.module('tsApp')
	//projects
	.controller('adminProjectController',['$scope',
			function($scope){
					$scope.addProject = function(){
												
					}
					$scope.projectClick = function(){
						
					}
					var project = {"name" : "proj1", "contributors" : "Pera Peric"};
					$scope.projects = [project];
				}
			
		]);
