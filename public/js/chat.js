var chatApp = angular.module('Chat', ['goangular']);

chatApp.config(function($goConnectionProvider) {
  $goConnectionProvider.$set('https://goinstant.net/469216b0e2ee/Flint');
});

chatApp.controller('ChatCtrl', function($scope, $goKey) {
  $scope.messages = $goKey('messages');
  $scope.messages.$sync();

  // We can attach a listener to the 'ready' event
  // to be notified when our model is in sync
  $scope.messages.$on('ready', function() {
    // Our local and remote structures are now in sync
  });

  // We can attach a listener to the 'error' event
  // to be notified when a problem occurs
  $scope.messages.$on('error', function() {
    // Uh oh
  });

  $scope.sendMessage = function() {
    var message = {
      content: $scope.messageContent,
      author: "User",
      rating: ""
    };
    // Each method returns a promise, we can use that to confirm that item was
    // added succesfully
    if($scope.messageContent)
      $scope.messages.$add(message).then(function() {
        $scope.messageContent = '';
        $("#messages").animate({ scrollTop: $('#messages')[0].scrollHeight}, 20);
      });
  }
});
