angular.module('myApp.controllers', [])
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', 'Home'];

function HomeCtrl($scope, Home) {
  $scope.users = Home.all();

  client = new Paho.MQTT.Client('broker.hivemq.com', Number(location.port), "clientId");

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({onSuccess:onConnect});

  function onConnect() {
    console.log("onConnect");
    client.subscribe("/qhacks/alternativehacks");
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
  }

  $scope.beginGame = function () {
  	console.log("hello");
  	$('#myModal').modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
  }

}
