angular.module('myApp.services')
.factory('Home', Home);

Home.$inject = [];

function Home(socketFactory) {

  var players = [{
    id: 1,
    name: "Tyler"
  }, {
    id: 2,
    name: "Yash"
  }];

  return {
    all: function() {
      return players;
    }
  }

}
