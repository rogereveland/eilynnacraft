// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var server = "http://eve.land/eilynnacraft/data.cfm";
angular.module('eilynnacraft', ['ionic', 'ngCordova', 'ionic-datepicker'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('index',{
      url : '/',
      templateUrl : 'partials/main.html',
      controller: 'MainController'
    })
    .state('setup',{
      url : '/setup',
      templateUrl : 'partials/setup.html',
      controller: 'SetupController'
    })
    .state('editChecklist',{
      url : '/editChecklist/:checklistID',
      templateUrl : 'partials/editChecklist.html',
      controller: 'EditChecklistController'
    })
    .state('checklist',{
      url : '/checklist',
      templateUrl : 'partials/checklist.html',
      controller: 'ChecklistController'
    })
  $urlRouterProvider.otherwise('/');
})

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
      
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
