var tsApp = angular.module('tsApp', ['ngRoute','ngResource']);

tsApp.config(function($routeProvider){
				
				$routeProvider
						.when(
							"/",
							{
									templateUrl : "index.html"
							}
						)
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
	}
);
