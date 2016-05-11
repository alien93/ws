angular.module('tsApp')
		//admin login
		.controller('authAdminController', ['$scope', '$http',
			function($scope, $http){
					$scope.login = function(){
						console.log('Hello from login');
						$http({
							method : "POST",
							url : "http://localhost:8080/login/adminLogin",
							data : $scope.user
						}).then(function(resp){
							alert(JSON.stringify(resp));
						}, 
						function(err){
							alert(JSON.stringify(err));
						});
					}
				}
		]);
