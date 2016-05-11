angular.module('tsApp')
		//user registration
		.controller('registerUserController', ['$scope', '$http',
			function($scope, $http){
					$scope.register = function(){
						console.log('Registration controller');
						$http({
							method : "POST",
							url : "http://localhost:8080/login/registerUser",
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
