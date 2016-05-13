angular.module('tsApp')
		//user dashboard
		.controller('userDashboardController', ['$scope',
			function($scope){
				$scope.taskStatus = [ "To do", "In progress", "Verify", "Done"];
				$scope.projects = [ 
					{name: "Project1", status: "To do", 
					 tasks: [ 
							{ name: "task1"},
							{ name: "taks2"},
							{ name: "task3"}
						]
					}, 
					{name: "Project2", status: "To do", 
					 tasks: [ 
							 { name: "task21"},
							 { name: "taks22"},
							 { name: "task23"}]
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
				
			}
		]);
