angular.module('tsApp')
        .controller('adminTaskController', function($scope, $routeParams, $uibModal){
            var idProj = $routeParams.idProj;
            var idTask = $routeParams.idTask;
            
            //-------------------test data------------------
            var contributors  = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
	        var taskContributor = {"name": "Pera Peric"};
            var comment1 = {"author":"Pera Peric", "commentDate":"25.5.2016.","content":"Komentar1"};
            var comment2 = {"author":"asdf123", "commentDate":"26.5.2016.","content":"Komentar2"};
	        var tasks = [{"name":"Task1", "contributor": taskContributor, "percentage": 30,
                          "status":"To Do", "priority":"Minor", 
                          "description":"Task1 description", "comments": [comment1, comment2]}, 
			             {"name":"Task2","contributor": taskContributor, "percentage": 50,
                          "status":"To Do", "priority":"Major", 
                          "description": "Task2 description", "comments": [comment1]}];
	        var project = {"name" : "proj1", "contributors" : contributors, "tasks":tasks};
            //-------------------\test data------------------
           
            $scope.projects = [project];
            $scope.task = $scope.projects[idProj].tasks[idTask];
            
            $scope.addComment = function(){
                var modalInstance = $uibModal.open({
								animation: false,
								templateUrl: 'adminAddComment_m.html',
								controller: 'adminAddCommentController',
								resolve: {
									item: function(){
											return $scope.task;
										}
									}
						});
            }
            
            $scope.modifyComment = function(index){
                var modalInstance = $uibModal.open({
								animation: false,
								templateUrl: 'adminAddComment_m.html',
								controller: 'adminModifyCommentController',
								resolve: {
									item: function(){
											return $scope.task;
										},
                                    index: function(){
                                        return index;
                                    }
                                }
						});
            }
            
            $scope.removeComment = function(index){
                $scope.task.comments.splice(index, 1);
            }
        })
        
        
        
        //------------------------MODAL DIALOGS-------------------------
        
        ////////////////////////////////////////////////////////////////////////
        ///// Adding comments
        ////////////////////////////////////////////////////////////////////////
        .controller("adminAddCommentController", ['$scope', 'item', '$uibModalInstance',
                function($scope, item, $uibModalInstance){
                   $scope.submit = function(){
                       var comment = {"author":"admin", "commentDate":new Date(),"content": $scope.comment.content};
                       item.comments.push(comment);
                       $uibModalInstance.close();
                   } 
                   
                   $scope.cancel = function(){
                       $uibModalInstance.close();
                   }
        }])
        
        ////////////////////////////////////////////////////////////////////////
        ///// Modifying comments
        ////////////////////////////////////////////////////////////////////////
        .controller("adminModifyCommentController", ['$scope', 'item', 'index', '$uibModalInstance',
                function($scope, item, index, $uibModalInstance){
                   var temp = angular.copy(item.comments[index]);
                   $scope.comment = temp;
                   $scope.submit = function(){
                       var comment = {"author":"admin", "commentDate":new Date(),"content": $scope.comment.content};
                       item.comments[index] = comment;
                       $uibModalInstance.close();
                   } 
                   
                   $scope.cancel = function(){
                       $uibModalInstance.close();
                   }
        }]);