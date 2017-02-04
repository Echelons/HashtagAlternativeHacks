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
  //$locationProvider.hashPrefix('!');
  $routeProvider
  .when('/home', {
    templateUrl: './templates/home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
