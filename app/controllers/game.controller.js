angular.module('myApp.controllers')
.controller('GameCtrl', GameCtrl);

GameCtrl.$inject = ['$scope'];

function GameCtrl($scope) {

  client = new Paho.MQTT.Client('broker.hivemq.com', Number(8000), "alternativehacks");

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({ onSuccess: onConnect });

  function onConnect() {
    console.log("onConnect");
    client.subscribe("/qhacks/alternativehacks");
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    console.log("Connection Lost. Reconnecting...");
    client.connect({ onSuccess: onConnect });
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log(message.payloadString);
    //var response = JSON.parse(message.payloadString);
    if(response.message == "debug") {
      console.log("Debugging");
    } else if (response.message == "gameready") {
      console.log("Game Ready");
    } else if (response.message == "score") {
      console.log("Score!");
    } else if (response.message == "gamecomplete") {
      console.log("Game Complete");
    } else {
      console.log("Incorrect message format: " + response.message);
    }
  };

}
