angular.module('myApp.controllers')
.controller('GameCtrl', GameCtrl);

GameCtrl.$inject = ['$scope'];

function GameCtrl($scope) {

  $scope.points = 0;

  client = new Paho.MQTT.Client('m13.cloudmqtt.com', 33244, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  var opts = {
    useSSL: true,
    userName: "front",
    password: "qhacks",
    onSuccess: onConnect
  };

  // connect the client
  client.connect(opts);

  function onConnect() {
    console.log("onConnect");
    client.subscribe("/qhacks/alternativehacks");
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    console.log("Connection Lost. Reconnecting...");
    client.connect(opts);
  }

  // called when a message arrives
  function onMessageArrived(message) {
    var response = JSON.parse(message.payloadString);
    if(response.message == "debug") {
      console.log("Debugging");
    } else if (response.message == "gameready") {
      console.log("Game Ready");
      $scope.points = 0;
    } else if (response.message == "score") {
      console.log("Score");
      $scope.points += response.points;
      $scope.$apply();
    } else if (response.message == "gamecomplete") {
      console.log("Game Complete");
      $scope.points = 0;
    } else {

    }
  };

}
