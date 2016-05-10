angular.module('tsApp')
		//userlogin
		.controller('authUserController', ['$scope',
			function($scope){
					$scope.login = function(){
						console.log('Hello from user login');
					}
				}
		]);
