var matchApp = angular.module('Match', ['goangular', 'ngAnimate', 'angularSlideables', 'firebase']);

matchApp.config(function($goConnectionProvider) {
  $goConnectionProvider.$set('https://goinstant.net/469216b0e2ee/Flint');
});

matchApp.controller('MatchCtrl', function($scope, $goKey, $firebase, $firebaseSimpleLogin, $goUsers, $goConnection, $window, $timeout) {

  console.log("active");
  var ref = new Firebase("https://flint.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user) {
    console.log(user.id);
    $scope.user = $goKey('users/' + user.id);
    $scope.user.$sync();
    $scope.user.$on('ready', function() {
      $scope.user.$set("waiting").then(function () {
        console.log("User is active!");
      });

    });
    $window.onbeforeunload = function() {
      $scope.user.$remove().then(function ( ) {
        console.log("User Removed!");
      });
    };
  });

  $scope.auth.$getCurrentUser().then(function(user) {
    $scope.users = $goKey('users');
    $scope.users.$sync();
    $scope.users.$on("ready", function() {
      $scope.counter = $goKey('counter');
      $scope.counter.$sync();

      $scope.counter.$on('ready', function() {
        // Pick Random Active User
        $scope.users.$$key.get(function (err, result) {
          var keys = Object.keys(result);
          keys.splice(keys.indexOf(user.id), 1);
          if(keys.length > 0) {
            $scope.mateId = keys[ keys.length * Math.random() << 0];
            var room = $scope.counter.$value + 1;
            $scope.counter.$set(room);

            $scope.userAcc = $goKey('accounts/' + user.id + '/matches/' + room + '/mateId');
            $scope.userAcc.$sync();
            $scope.userAcc.$on("ready", function() {
              $scope.mateAcc = $goKey('accounts/' + $scope.mateId + '/matches/' + room + '/mateId');
              $scope.mateAcc.$sync();
              $scope.mateAcc.$on("ready", function() {
                $scope.mateMatched = $goKey('accounts/' + $scope.mateId + '/matched');
                $scope.mateMatched.$sync();
                $scope.mateMatched.$on("ready", function() {
                  console.log("ALL READY");
                  $scope.mateMatched.$set(room + "").then(function() {
                    $scope.userAcc.$set($scope.mateId).then(function() {
                      $scope.mateAcc.$set(user.id).then(function() {
                        $scope.user = $goKey('users/' + user.id);
                        $scope.user.$sync();
                        $scope.user.$remove().then(function ( ) {
                          console.log("User Removed!");
                          document.location.href = "/chat?room=" + room;
                        });
                      });
                    });
                  });
                });

              });
              console.log("Set")
            });

          }
        });

      });

    });

    var poll = function() {
      $timeout(function() {
        $scope.matched = $goKey('accounts/' + user.id + '/matched');
        $scope.matched.$sync();
        $scope.matched.$on('ready', function() {
          console.log($scope.matched.$value);
          if ($scope.matched.$value > 0) {
            var newRoom = $scope.matched.$value;
            $scope.matched.$set(-1).then(function() {
              console.log($scope.matched.$value);
              $scope.user = $goKey('users/' + user.id);
              $scope.user.$sync();
              $scope.user.$remove().then(function ( ) {
                console.log("User Removed!");
                console.log("Set to -1");
                document.location.href = "/chat?room=" + newRoom;
              });
            });
          }
        });

        console.log("polling");
        poll();
      }, 1000);
    };  
    poll();

  }); // End getCurrentUser

}); // End Controller
