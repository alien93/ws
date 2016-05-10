angular.module('tsApp')
		//user registration
		.controller('registerUserController', ['$scope',
			function($scope){
					$scope.register = function(){
						console.log('Registration controller');
					}
				}
		]);
