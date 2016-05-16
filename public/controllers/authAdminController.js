angular.module('tsApp')
		//admin login
		.controller('authAdminController', ['$scope', '$http', '$location', '$cookies',
			function($scope, $http, $location, $cookies){
					$scope.login = function(){
						console.log('Hello from login');
						$http({
							method : "POST",
							url : "http://localhost:8080/rest/adminLogin",
							data : $scope.user
						}).then(function(resp){
							///alert(JSON.stringify(resp));
							var retVal = JSON.parse(JSON.stringify(resp)).data[0];
							$cookies.put('type', retVal.type);
							$cookies.put('username', retVal.username);
							console.log($cookies.get('username'));
							console.log($cookies.get('type'));
							$location.path("/adminProjects")
						}, 
						function(err){
							alert(JSON.stringify(err));
						});
					}
				}
		]);
