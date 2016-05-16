angular.module('tsApp')
        .controller('adminTaskController', function($scope, $routeParams, $uibModal, $cookies, $location){
            var idProj = $routeParams.idProj;
            var idTask = $routeParams.idTask;
            
            //-------------------test data------------------
            var contributors  = [{"name": "Pera Peric"}, {"name":"Mika Mikic"}];
	        var taskContributor = {"name": "Pera Peric"};
            var comment1 = {"author":"Pera Peric", "commentDate":"25.5.2016.","content":"Komentar1"};
            var comment2 = {"author":"asdf123", "commentDate":"26.5.2016.","content":"Komentar2"};
	        var taskVersions = [{"name":"Task1", "createdBy":"admin", "contributor": taskContributor, "percentage": 30,
                          "status":"To Do", "priority":"Minor", 
                          "description":"Task1 description", "comments": [comment1, comment2]}, 
			             {"name":"Task1", "createdBy":"admin","contributor": taskContributor, "percentage": 50,
                          "status":"To Do", "priority":"Major", 
                          "description": "Task2 description", "comments": [comment1]}];
	        var projects = [{"name" : "proj1", "contributors" : contributors, "tasks":[]}];
            var task = {"code":"code", "project":projects[0], "taskVersions": taskVersions};
            projects[idProj].tasks.push(task);
           
            $scope.task = projects[idProj].tasks[idTask];
            
            $scope.addComment = function(index){
                var modalInstance = $uibModal.open({
								animation: false,
								templateUrl: 'adminAddComment_m.html',
								controller: 'adminAddCommentController',
								resolve: {
									item: function(){
											return $scope.task.taskVersions[index];
										}
								}
						});
            }
            
            $scope.modifyComment = function(taskIndex, commentIndex){
                var modalInstance = $uibModal.open({
								animation: false,
								templateUrl: 'adminAddComment_m.html',
								controller: 'adminModifyCommentController',
								resolve: {
									item: function(){
											return $scope.task.taskVersions[taskIndex];
										},
                                    index: function(){
                                        return commentIndex;
                                    }
                                }
						});
            }
            
            $scope.removeComment = function(taskIndex, commentIndex){
                $scope.task.taskVersions[taskIndex].comments.splice(commentIndex, 1);
            }
            
            $scope.logout = function(){
                $cookies.remove('type');
                $cookies.remove('username');
                $location.path('/adminLogin');
            }
        })
        
        
        
        //------------------------MODAL DIALOGS-------------------------
        
        ////////////////////////////////////////////////////////////////////////
        ///// Adding comments
        ////////////////////////////////////////////////////////////////////////
        .controller("adminAddCommentController", ['$scope', 'item', '$uibModalInstance', '$cookies',
                function($scope, item, $uibModalInstance, $cookies){
                   $scope.submit = function(){
                       var comment = {"author":$cookies.get('username'), "commentDate":new Date(),"content": $scope.comment.content};
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