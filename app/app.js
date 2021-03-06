'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.controllers',
  'myApp.services',
  'ngRoute',
  'myApp.version'
])

.config(['$locationProvider', '$routeProvider',
function($locationProvider, $routeProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl: './templates/home.html',
    controller: 'HomeCtrl'
  })
  .when('/game', {
    templateUrl: './templates/game.html',
    controller: 'GameCtrl'
  })
  .when('/recap', {
    templateUrl: './templates/recap.html',
    //controller: 'RecapCtrl'
  })
  .otherwise({ redirectTo: '/' });

}]);
