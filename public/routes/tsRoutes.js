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
						.when(
							"/adminProjectTask/:idProj/:idTask",
							{
									templateUrl: "adminProjectTask.html"
							}
						)
						.when(
							"/userTask/:idProj/:idTask",
							{
									templateUrl: "userTask.html"
							}
						)
						.otherwise(
							{
							redirectTo: "/userDashboard"
							}	
						);
	}
);
