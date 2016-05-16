angular.module('tsApp')
	//projects
	.controller('adminProjectController',['$scope', '$uibModal', '$location', '$cookies',
			function($scope, $uibModal, $location, $cookies){
				
					//---------test data------------------
					var contributors  = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
					var taskContributor = {"name": "Pera Peric"};
					var tasks = [{"name":"Task1", "createdBy":"admin", "contributor": taskContributor, "percentage": 30, "status":"To Do",
										 "description":"Task1 description", "priority":"Minor"}, 
								 {"name":"Task2", "createdBy":"admin","contributor": taskContributor, "percentage": 50, "status":"To Do", 
								 	 	 "description": "Task2 description", "priority":"Major"}];
					var project = {"name" : "proj1", "contributors" : contributors, "tasks":tasks};
					//---------\test data-----------------
					
					$scope.projects = [project];
					
					$scope.addProject = function(){
						var project = {"name" : $scope.project.name, "contributors" : [], "tasks":[]};
						$scope.projects.push(project);
						$scope.project.name = "";
					}
					$scope.projectClick = function(index){
						//console.log("Index: " + index);
					}
					
					$scope.moreInfo = function(projectIndex, taskIndex){
						$location.path('/adminProjectTask/'+projectIndex+"/"+taskIndex);
					}
					
					$scope.modifyContributors = function(index){
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
								items: function(){
									return $scope.projects;
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
					
					// Vidljivost taskova u okviru nekog projekta, mijenja se na klik
					$scope.tasksVisible = [true, true]; 
					//Promjeni status da li su taskovi vidljivi
					$scope.showTasks = function(index) { 
						$scope.tasksVisible[index] = !($scope.tasksVisible[index]);
					}
					//Vraca true ili false, za odredjeni projekat (indeks projekta)
					$scope.testIfVisible = function(index) { 
						return $scope.tasksVisible[index];
					}	
					
					$scope.logout = function(){
						$cookies.remove('type');
						$cookies.remove('username');
						$location.path('/adminLogin');
					}
				}
		])
		
		
		
		//-----------------------MODAL DIALOGS----------------------
		
		////////////////////////////////////////////////////////////////////////////////
		////// Add/remove project contributors, add/remove project tasks
		////////////////////////////////////////////////////////////////////////////////
		.controller('adminMCController', ['$scope', 'items', '$uibModalInstance',
				function($scope, items, $uibModalInstance){
						$scope.project = items;
						$scope.contributor = {};
						$scope.task = {};
						$scope.contributors = items.contributors;
						
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
							var contributors = [];
							$scope.contributors.push(newContributor);
							$scope.contributor.name = "";
						}
						$scope.removeContributor = function(index){
							$scope.project.contributors.splice(index, 1);
						}
						
						////////////////////////////////////////
						//close
						////////////////////////////////////////
						$scope.close = function(){
							$uibModalInstance.close();
						}
				}
		])
		
		////////////////////////////////////////////////////////////////////////////////
		////// Modify task
		////////////////////////////////////////////////////////////////////////////////
		.controller('adminMTController', ['$scope', 'items', '$uibModalInstance', 'projectIndex', 'taskIndex',
				function($scope, items, $uibModalInstance, projectIndex, taskIndex){
						$scope.projects = items;
						$scope.task = $scope.projects[projectIndex].tasks[taskIndex];
						$scope.project = $scope.projects[projectIndex];
						
						var task = { name: "", percent: 0, users: {} };
						var selectedContributors = [];
						$scope.selectedContributors = selectedContributors;
						
						$scope.close = function(){
							$uibModalInstance.close();
						}
				}
		]);
