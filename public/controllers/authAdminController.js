angular.module('tsApp')
		//admin login
		.controller('authAdminController', ['$scope',
			function($scope){
					$scope.login = function(){
						console.log('Hello from login');
					}
				}
		]);
