var countApp = angular.module('count-module', ['goangular', 'firebase']);

countApp.config(function($goConnectionProvider) {
  $goConnectionProvider.$set('https://goinstant.net/469216b0e2ee/Flint');
});

countApp.controller('countCTRL', function($scope, $goKey, $firebase, $firebaseSimpleLogin, $goUsers, $goConnection, $window, $timeout) {
    
    var ref = new Firebase("https://flint.firebaseio.com/");
    $scope.auth = $firebaseSimpleLogin(ref);
    $scope.auth.$getCurrentUser().then(function(user) {
        $scope.userAcc = $goKey('accounts/' + user.id + '/online');
        $scope.userAcc.$sync();
        $scope.userAcc.$on('ready', function() {
            $scope.userAcc.$set(true).then(function () {
                console.log("User is online!");
            });
            $scope.userAcc.$sync();
        });
        
        $window.onbeforeunload = function() {
            $scope.userAcc.$set(false).then(function () {
                console.log("User is offline!");
            });
        };
        
    });
});