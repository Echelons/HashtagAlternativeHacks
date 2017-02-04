angular.module('myApp.controllers')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', 'Home'];

function HomeCtrl($scope, Home) {
  $scope.users = Home.all();
}
