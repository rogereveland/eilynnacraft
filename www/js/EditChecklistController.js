angular.module('eilynnacraft').controller('EditChecklistController',['$scope','$http', '$ionicPlatform','$location', '$ionicModal', '$stateParams', 'ionicDatePicker', function($scope, $http, $ionicPlatform, $location, $ionicModal, $stateParams, ionicDatePicker){
    $scope.shouldShowReorder = false;
    $scope.shouldShowDelete = false;
    var d = new Date();
    $scope.checklist = {
        checklist_id : $stateParams.checklistID,
        checklist_name : "",
        checklist_date : (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(),
        items : []
    };

    $scope.blankItem = {
        item_id : 0,
        item_name : "",
        completed : false,
        points : 0,
        item_date : "",
        item_time : ""
    };

    $scope.editingItem = angular.copy($scope.blankItem);

    var ipObj1 = {
        callback: function (val) {  //Mandatory
            var d = new Date(val);
            $scope.checklist.checklist_date = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        },        
        closeOnSelect: true,
        templateType: 'popup'
    };

    $scope.editItem = function(item){
        $scope.editingItem = item;
        $scope.openModal();
    };

    $scope.newChecklist = function(){
        $location.path('/editChecklist/0');
    };

    $scope.openDatePicker = function(){
        ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.reorderItem = function(item, fromIndex, toIndex){
        $scope.checklist.items.move(fromIndex, toIndex);
        $scope.saveChecklist();
    };
    
    $scope.saveItem = function(){
        if($scope.editingItem.item_id == 0){
            $scope.checklist.items.push($scope.editingItem);
        }
        $scope.editingItem = angular.copy($scope.blankItem);
        $scope.saveChecklist();
        $scope.closeModal();
    };

    $scope.saveChecklist = function(){
        var formData = {
            checklist : $scope.checklist,
            action : "saveChecklist"
        };

        $http.post(server, formData).then(function(res){
            $scope.getChecklist();
        });
    };

    $scope.toggleReordering = function(){
        $scope.shouldShowReorder = !$scope.shouldShowReorder;
    };

    $scope.toggleDeletion = function(){
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
    };

    $scope.deleteItem = function(item, index){
        var formData = {
            action : "deleteItem",
            item : item
        };
        
        $http.post(server, formData).then(function(){
            $scope.getChecklist();
        });
    };

    $scope.getChecklist = function(){
        var formData = {
            action : "getChecklist",
            checklist_id : $stateParams.checklistID
        };
        $http.post(server, formData).then(function(res){
            $scope.checklist = res.data;
        });
    };

    

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });


    if($scope.checklist.checklist_id != 0){
        $scope.getChecklist();
    }    


    /*
        Credit to Reid from StackOverflow
        http://stackoverflow.com/a/5306832
    */
    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this; // for testing purposes
    };


}]);