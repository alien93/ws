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
	}
);
