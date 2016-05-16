angular.module('tsApp')
		//userlogin
		.controller('authUserController', ['$scope', '$http', '$location', '$cookies', 
			function($scope, $http, $location, $cookies){
					$scope.login = function(){
						console.log('Hello from user login');
						$http({
							method : "POST",
							url : "http://localhost:8080/rest/userLogin",
							data : $scope.user
						}).then(function(resp){
							//alert(JSON.stringify(resp));
							var retVal = JSON.parse(JSON.stringify(resp)).data[0];
							$cookies.put('type',retVal.type);
							$cookies.put('username', retVal.username);
							$location.path("/userDashboard");
						}, 
						function(err){
							alert(JSON.stringify(err));
						});
					}
				}
		]);
