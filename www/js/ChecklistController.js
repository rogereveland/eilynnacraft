angular.module('eilynnacraft').controller('ChecklistController',['$scope','$http', '$ionicPlatform','$location', '$ionicPopover', function($scope, $http, $ionicPlatform, $location, $ionicPopover){
    var tempNum = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    console.log(tempNum)
    $scope.bgImage = "bg-img" + tempNum;
    $scope.checklist = {};
    $scope.getToday = function(){
        var formData = {
            action : "getToday"
        };

        $http.post(server, formData).then(function(res){
            $scope.checklist = res.data;
        });

    };

    $scope.toggleComplete = function(item){
        if(item.completed == 0){
            item.completed = 1;
        } else {
            item.completed = 0;
        }
    };

    $scope.getToday();
    
}]);