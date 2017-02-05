angular.module('myApp.controllers')
.controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$scope', 'Home'];

function HomeCtrl($scope, Home) {
  $scope.users = Home.all();

 //  $scope.easyMode = function () {
 //  	if ($('#easy-button').hasClass('active') == false) {
 //  		$('#easy-button').addClass('active');
 //  		$('#hard-button').removeClass('active');
 //  	}
 //  }
 //  $scope.hardMode = function () {
 //  	$('#easy-button').removeClass('active');
 //  	$('#hard-button').addClass('active');
 //  }

 //  $scope.beginGame = function () {
 //  	//console.log("hello");
 //  	$('#myModal').modal('hide');
	// $('body').removeClass('modal-open');
	// $('.modal-backdrop').remove();
	// var gameMode = $('#game-mode .active').attr('value');
	// console.log(gameMode);
	// var name = document.getElementById('1234').value;
	// console.log(name);
 //  }

  var startTime;
  var currentTime;
  var gameTimer;

  $scope.t = 0;

  $scope.startTimer = function () {
    startTime = moment();
    gameTimer = window.setInterval(function () {
      currentTime = moment();
      // currentTime /= 1000;
      // var seconds = Math.round(currentTime % 60);
      $scope.t = moment(currentTime.diff(startTime)).format("mm:ss");
      $scope.$apply();
    }, 1000)
  }

  function score (cup_id) {
    $(cup_id).attr('fill', '#2AE224');  
  }

  $scope.points = 0;

  function clearCups() {
    $('#check_1').attr('fill', '#FFFFFF');
    $('#check_2').attr('fill', '#FFFFFF');
    $('#check_3').attr('fill', '#FFFFFF');
    $('#check_4').attr('fill', '#FFFFFF');
    $('#check_5').attr('fill', '#FFFFFF');
    $('#check_6').attr('fill', '#FFFFFF');
  }

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
      switch(response.position) {
        case 1:
          score('#check_1');
          break;
        case 2: 
          score('#check_2');
          break;
        case 3: 
          score('#check_3');
          break;
        case 4: 
          score('#check_4');
          break;
        case 5: 
          score('#check_5');
          break;
        case 6: 
          score('#check_6');
          break;
        default: 
          console.log("wtf??");
      }
      $scope.points += response.points;
      $scope.$apply();
    } else if (response.message == "gamecomplete") {
      console.log("Game Complete");
      clearCups();
      $scope.points = 0;
      window.clearInterval(gameTimer);
      $scope.t = moment(moment().diff(moment())).format("mm:ss");
      $scope.$apply();
    } else {

    }
  };

}
