angular.module('tsApp')
		//user dashboard
		.controller('userDashboardController', ['$scope', '$uibModal', '$http', '$location', '$cookies',
			function($scope, $uibModal, $http, $location, $cookies){
				
				$scope.taskStatus = [ "To do", "In progress", "Verify", "Done"];
				$scope.projects = [];
				
				(function onLoad(){
					$http({
						method : 'GET',
						url: 'http://localhost:8080/rest/getProjects'
					}).then(function(resp){
							//alert(resp.data);
							$scope.projects = resp.data
							for(var i = 0; i < $scope.projects.length; i++){
								$http({
									url: 'http://localhost:8080/rest/getTasksForProject', 
									method: 'POST',
									data: {projectId : $scope.projects[i]._id, index : i}
								}).then(function(resp){
									$scope.projects[resp.data.index].tasks = resp.data.tasks;
								},function(err){
									alert(err.data);
								});
								$http({
									url: 'http://localhost:8080/rest/getUsersForProject', 
									method: 'POST',
									data: {projectId : $scope.projects[i]._id, index : i}
								}).then(function(resp){
									$scope.projects[resp.data.index].users = resp.data.users;
								},function(err){
									alert(err.data);
								});
							}
						}, function(err){
							alert(JSON.stringify(err));
						});
				}());
				
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
				
				$scope.moreInfo = function(idProj, idTask){
						$location.path('/userTask/'+projectIndex+"/"+taskIndex);
				}	
				
				$scope.logout = function(){
						console.log($cookies.get('username'));
						$location.path('/userLogin');
				}	
			}
		])
		//-----------------------MODAL DIALOGS----------------------
		.controller('modalAddTaskController', ['$scope', 'items', '$uibModalInstance', '$http',
				function($scope, items, $uibModalInstance, $http){
						$scope.project = items;
						
						var task = { title: "", description: "", assignedTo:null, priority:null,
					projectId:$scope.project._id };
						var selectedContributors = [];
					
						$scope.task = task;
						$scope.priorities = ["Blocker", "Critical", "Major", "Minor", "Trivial"];
						
						$scope.ok = function(){
							task.assignedTo = task.assignedTo ? task.assignedTo._id : null;
							$http({
								url: 'http://localhost:8080/rest/createTask',
								method: 'POST',
								data: $scope.task
							}).then(function(resp){
								$scope.project.tasks.push(resp.data);
								$uibModalInstance.close();
							}, function(err){
								alert(JSON.stringify(err));
							});
						}
						$scope.cancel = function(){
							$uibModalInstance.close();
						}
				}
		]);
