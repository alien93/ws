angular.module('tsApp')
	//projects
	.controller('adminProjectController',['$scope', '$uibModal',
			function($scope, $uibModal){
					var contributors  = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
					var project = {"name" : "proj1", "contributors" : contributors};
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
						})
					}
				}
			
		])
		
		
		
		//-----------------------MODAL DIALOGS----------------------
		.controller('adminMCController', ['$scope', 'items',
				function($scope, items){
						$scope.project = items;
						$scope.contributor = [];
						$scope.addContributor = function(){
							var newContributor = {"name" : $scope.contributor.name};
							$scope.project.contributors.push(newContributor);
							$scope.contributor.name = "";
						}
				}
		]);
