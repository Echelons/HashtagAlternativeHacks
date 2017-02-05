angular.module('myApp.controllers')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', 'Home'];

function HomeCtrl($scope, Home) {
  $scope.users = Home.all();

  $scope.easyMode = function () {
  	if ($('#easy-button').hasClass('active') == false) {
  		$('#easy-button').addClass('active');
  		$('#hard-button').removeClass('active');
  	}
  }
  $scope.hardMode = function () {
  	$('#easy-button').removeClass('active');
  	$('#hard-button').addClass('active');
  }

  $scope.beginGame = function () {
  	//console.log("hello");
  	$('#myModal').modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
	var gameMode = $('#game-mode .active').attr('value');
	console.log(gameMode);
	var name = document.getElementById('1234').value;
	console.log(name);
  }
}
