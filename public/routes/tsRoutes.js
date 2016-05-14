var tsApp = angular.module('tsApp', ['ngRoute','ngResource', 'ui.bootstrap']);

tsApp.config(function($routeProvider){
				
				$routeProvider
						.when(
							"/adminLogin",
							{
									templateUrl : "adminLogin.html"
							}
						)
						.when(
							"/userRegister",
							{
									templateUrl : "userRegister.html"
							}
						)
						.when(
							"/userLogin",
							{
									templateUrl : "userLogin.html"
							}
						)
						.when(
							"/adminProjects",
							{
									templateUrl: "adminProjects.html"
							}
						)
						.when(
							"/userDashboard",
							{
									templateUrl : "userDashboard.html"
							}
						)
						.otherwise(
							{
							redirectTo: "/userDashboard"
							}	
						);
	}
);
