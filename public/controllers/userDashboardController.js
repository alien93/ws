angular.module('tsApp')
		//user dashboard
		.controller('userDashboardController', ['$scope', '$uibModal',
			function($scope, $uibModal){
				$scope.taskStatus = [ "To do", "In progress", "Verify", "Done"];
				$scope.projects = [ 
					{name: "Project1", status: "To do", 
					 tasks: [ 
							{ name: "task1"},
							{ name: "taks2"},
							{ name: "task3"}
						],
					 users: [ { name: "Pera" }, { name: "Mika"}, { name: "Zika"}]
					}, 
					{name: "Project2", status: "To do", 
					 tasks: [ 
							 { name: "task21"},
							 { name: "taks22"},
							 { name: "task23"}],
					 users: [ { name: "Pera" }, { name: "Mika"}, { name: "Zika"}, { name: "Sima"}, { name: "Rajko"}]
					}
				];
				
				
				$scope.tasksVisible = [true, true]; // Vidljivost taskova u okviru nekog projekta, mijenja se na klik
				$scope.showTasks = function(index) { //Promjeni status da li su taskovi vidljivi
					$scope.tasksVisible[index] = !($scope.tasksVisible[index]);
				}
				$scope.testIfVisible = function(index) { //Vraca true ili false, za odredjeni projekat (indeks projekta)
					return $scope.tasksVisible[index];
				}	
				$scope.addProject = function(newProject) {
					$scope.projects.push(newProject); 
					$scope.tasksVisible.push(false);
				}
				$scope.addNewTask = function(index){
					var modalInstance = $uibModal.open({
								animation: false,
								templateUrl: 'modalAddTask.html',
								controller: 'modalAddTaskController',
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
		.controller('modalAddTaskController', ['$scope', 'items', '$uibModalInstance',
				function($scope, items, $uibModalInstance){
						$scope.project = items;
						
						var task = { name: "", percent: 0, users: {} };
						var selectedContributors = [];
					
						$scope.task = task;
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
							$scope.task.users = $scope.selectedContributors;
							$scope.project.tasks.push($scope.task);
							//console.log($scope.task);
							$uibModalInstance.close();
						}
						$scope.cancel = function(){
							$uibModalInstance.close();
						}
				}
		]);
