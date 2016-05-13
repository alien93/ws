angular.module('tsApp')
	//projects
	.controller('adminProjectController',['$scope', '$uibModal',
			function($scope, $uibModal){
					var contributors  = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
					var tasks = [{"name":"Task1"}, {"name":"Task2"}];
					var project = {"name" : "proj1", "contributors" : contributors, "tasks":tasks};
					$scope.projects = [project];
					
					$scope.addProject = function(){
						var project = {"name" : $scope.project.name, "contributors" : []};
						$scope.projects.push(project);
						$scope.project.name = "";
					}
					$scope.projectClick = function(index){
						console.log("Index: " + index);
					}
					$scope.modifyContributors = function(index){
						//var project = $scope.projects[index];
						//$scope.projects[index] = {"name" : project.name, "contributors": "Mika"};
						var modalInstance = $uibModal.open({
								animation: false,
								templateUrl: 'adminModifyControbutors_m.html',
								controller: 'adminMCController',
								resolve: {
									items: function(){
											return $scope.projects[index];
										},
									index: function(){
											return index;
										}
									}
						});
					}
				}
			
		])
		
		
		
		//-----------------------MODAL DIALOGS----------------------
		.controller('adminMCController', ['$scope', 'items', '$uibModalInstance',
				function($scope, items, $uibModalInstance){
						$scope.project = items;
						$scope.contributor = [];
						$scope.task = []
						
						////////////////////////////////////////
						//tasks
						////////////////////////////////////////
						$scope.addTask = function(){
							var newTask = {"name": $scope.task.name};
							$scope.project.tasks.push(newTask);
							$scope.task.name = "";
						}
						$scope.removeTask = function(index){
							$scope.project.tasks.splice(index, 1);
						}
						
						
						////////////////////////////////////////
						//contributors
						////////////////////////////////////////
						$scope.addContributor = function(){
							var newContributor = {"name" : $scope.contributor.name};
							$scope.project.contributors.push(newContributor);
							$scope.contributor.name = "";
						}
						$scope.removeContributor = function(index){
							$scope.project.contributors.splice(index, 1);
						}
						
						
						$scope.ok = function(){
							$uibModalInstance.close();
						}
						$scope.cancel = function(){
							$uibModalInstance.close();
						}
				}
		]);
