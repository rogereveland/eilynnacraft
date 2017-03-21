angular.module('eilynnacraft').controller('SetupController',['$scope','$http', '$ionicPlatform','$location', '$ionicPopover', function($scope, $http, $ionicPlatform, $location, $ionicPopover){
    $scope.checklists = [];

    $scope.newChecklist = function(){
        $location.path('/editChecklist/0');
    };

    $scope.getChecklists = function(){
        var formData = {
            action : "getChecklists"
        };

        $http.post(server, formData).then(function(res){
            $scope.checklists = res.data;
        });
    };

    $scope.editList = function(list){
        $location.path('/editChecklist/' + list.checklist_id)
    };

    $scope.getChecklists();
}]);