angular.module('tsApp')
		//admin login
		.controller('authAdminController', ['$scope', '$http', '$location',
			function($scope, $http, $location){
					$scope.login = function(){
						console.log('Hello from login');
						$http({
							method : "POST",
							url : "http://localhost:8080/rest/adminLogin",
							data : $scope.user
						}).then(function(resp){
							alert(JSON.stringify(resp));
							$location.path("/userDashboard.html")
						}, 
						function(err){
							alert(JSON.stringify(err));
						});
					}
				}
		]);
