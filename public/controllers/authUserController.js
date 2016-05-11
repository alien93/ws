angular.module('tsApp')
		//userlogin
		.controller('authUserController', ['$scope', '$http',
			function($scope, $http){
					$scope.login = function(){
						console.log('Hello from user login');
						$http({
							method : "POST",
							url : "http://localhost:8080/login/userLogin",
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
