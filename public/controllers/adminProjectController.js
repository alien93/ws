angular.module('tsApp')
	//projects
	.controller('adminProjectController',['$scope', '$uibModal',
			function($scope, $uibModal){
					var contributors  = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
					var taskContributors = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
					var tasks = [{"name":"Task1", "contributors": taskContributors, "percentage": 30}, {"name":"Task2","contributors": taskContributors, "percentage": 50}];
					var project = {"name" : "proj1", "contributors" : contributors, "tasks":tasks};
					$scope.projects = [project];
					
					$scope.addProject = function(){
						var project = {"name" : $scope.project.name, "contributors" : [], "tasks":[]};
						$scope.projects.push(project);
						$scope.project.name = "";
					}
					$scope.projectClick = function(index){
						//console.log("Index: " + index);
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
					$scope.modifyTask = function(projectIndex, taskIndex){
						var modalInstance = $uibModal.open({
							animation: false,
							templateUrl: 'adminModifyTask_m.html',
							controller: 'adminMTController',
							resolve:{
								item: function(){
									return $scope.projects[projectIndex].tasks[taskIndex];
								},
								projectIndex: function(){
									return projectIndex;	
								},
								taskIndex: function(){
									return taskIndex;
								}
							}
						});						
					}
					
					
					$scope.tasksVisible = [true, true]; // Vidljivost taskova u okviru nekog projekta, mijenja se na klik
					$scope.showTasks = function(index) { //Promjeni status da li su taskovi vidljivi
						$scope.tasksVisible[index] = !($scope.tasksVisible[index]);
					}
					$scope.testIfVisible = function(index) { //Vraca true ili false, za odredjeni projekat (indeks projekta)
						return $scope.tasksVisible[index];
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
		])
		.controller('adminMTController', ['$scope', 'item', '$uibModalInstance', 'projectIndex', 'taskIndex',
				function($scope, item, $uibModalInstance, projectIndex, taskIndex){
						$scope.task = item;
						console.log($scope.task);
						$scope.task.percent = item.percentage;
						
						var task = { name: "", percent: 0, users: {} };
						var selectedContributors = [];
						$scope.selectedContributors = selectedContributors;
						
						
						$scope.addContributor = function(){
							var newContributor = $scope.selectedName;
							var alreadyAdded = false;
							for (var i = 0; i < $scope.selectedContributors.length; i++) {
								if ($scope.selectedContributors[i].name === $scope.selectedName) {
									alreadyAdded = true;
									break;
								}
							}
							if (!alreadyAdded)
								$scope.selectedContributors.push(newContributor);
						}
						
						$scope.removeContributor = function(index){
								$scope.selectedContributors.splice(index, 1);
						}
						
						$scope.ok = function(){
							$scope.projects[projectIndex].tasks[taskIndex].contributors = $scope.selectedContributors;
							$uibModalInstance.close();
						}
						$scope.cancel = function(){
							$uibModalInstance.close();
						}
				}
		]);
