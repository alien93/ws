angular.module('tsApp')
		//userlogin
		.controller('authUserController', ['$scope', '$http', '$location',
			function($scope, $http, $location){
					$scope.login = function(){
						console.log('Hello from user login');
						$http({
							method : "POST",
							url : "http://localhost:8080/rest/userLogin",
							data : $scope.user
						}).then(function(resp){
							alert(JSON.stringify(resp));
							$location.path("/userDashboard.html");
						}, 
						function(err){
							alert(JSON.stringify(err));
						});
					}
				}
		]);
