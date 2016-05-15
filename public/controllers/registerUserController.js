angular.module('tsApp')
		//user registration
		.controller('registerUserController', ['$scope', '$http', '$location',
			function($scope, $http, $location){
					$scope.register = function(){
						console.log('Registration controller');
						$http({
							method : "POST",
							url : "http://localhost:8080/rest/registerUser",
							data : $scope.user
						}).then(function(resp){
							alert(JSON.stringify(resp));
							$http({
								url: "http://localhost:8080/rest/userLogin", 
								method: 'POST',
								data: resp.data
							}).then(function(resp){
								///alert(resp);
								$location.path("/userDashboard.html");
							},function(err){
								alert(JSON.stringify(err));
							});
						}, 
						function(err){
							alert(JSON.stringify(err));
						});
					}
				}
		]);
