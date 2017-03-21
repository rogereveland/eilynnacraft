angular.module('eilynnacraft').controller('MainController',['$scope','$http', '$ionicPlatform','$location', '$ionicPopover', function($scope, $http, $ionicPlatform, $location, $ionicPopover){

    $scope.popover = "";
    $scope.verify = {
        base : 0,
        answer : ""
    }
    
    $scope.checkGrownup = function(event){
        $scope.verify.base = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        $scope.openPopover(event);
    };

    $scope.checkAnswer = function(){
        if(Number($scope.verify.answer) == ($scope.verify.base * $scope.verify.base)){
            $scope.closePopover();
            $location.path('/setup');
        } else {
            $scope.closePopover();
            console.log("Incorrect");
            $scope.verify.answer = "";
        }
    }

    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    
    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    $scope.openChecklist = function(){
        $location.path('/checklist');
    };

    var tempNum = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    $scope.bgImage = "bg-img" + tempNum;
}]);