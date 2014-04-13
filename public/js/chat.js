var chatApp = angular.module('Chat', ['goangular', 'ngAnimate', 'angularSlideables', 'firebase']);

function getParamByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

chatApp.config(function($goConnectionProvider) {
  $goConnectionProvider.$set('https://goinstant.net/469216b0e2ee/Flint');
});
var test;

chatApp.controller('ChatCtrl', function($scope, $goKey, $firebase, $firebaseSimpleLogin) {
  var room = getParamByName('room');

  $scope.interests = [];
  var ref = new Firebase("https://flint.firebaseio.com/");
  $scope.auth = $firebaseSimpleLogin(ref);
  $scope.auth.$getCurrentUser().then(function(user) {
    var mateId;
    $scope.mateId = $goKey('accounts/' + user.id + '/matches/' + room + '/mateId');
    $scope.mateId.$sync();
    $scope.mateId.$on('ready', function() {
      mateId = $scope.mateId.$value;
      console.log($scope.mateId)

    $scope.movies = $goKey('accounts/'+mateId+'/movies');
    $scope.movies.$sync();
    $scope.movies.$on('ready', function() {
      $scope.interests.push({
        title: "Movies",
        items: [
            $scope.movies[0],
            $scope.movies[1],
            $scope.movies[2]
        ],
      });
    });
    
    $scope.music = $goKey('accounts/' + mateId+ '/music');
    $scope.music.$sync();
    $scope.music.$on('ready', function() {
      $scope.interests.push({  
        title: "Music",
        items: [
          $scope.music[0],
          $scope.music[1],
          $scope.music[2]
        ]
      });
    });
 
    $scope.tv = $goKey('accounts/' + mateId+ '/television');
    $scope.tv.$sync();
    $scope.tv.$on('ready', function() {
      $scope.interests.push({  
        title: "TV Shows",
        items: [
          $scope.tv[0],
          $scope.tv[1],
          $scope.tv[2]
        ]
      });
    });

    $scope.languages = $goKey('accounts/' + mateId+ '/languages');
    $scope.languages.$sync();
    $scope.languages.$on('ready', function() {
      $scope.interests.push({  
        title: "Languages",
        items: [
          $scope.languages[0],
          $scope.languages[1],
          $scope.languages[2]
        ]
      });
    });

    $scope.hometown = $goKey('accounts/' + mateId + '/hometown');
    $scope.hometown.$sync();
    $scope.hometown.$on('ready', function( ) { 
      $scope.interests.push({
        title: "Hometown",
        items: [
          $scope.hometown.$value
        ]
      });
    });

    $scope.likes = $goKey('accounts/' + mateId + '/likes');
    $scope.likes.$sync();
    $scope.likes.$on('ready', function( ) { 
      $scope.interests.push({
        title: "Likes",
        items: [
          $scope.likes[0].name,
          $scope.likes[1].name,
          $scope.likes[2].name,
        ]
      });
    });

    });

  });


  $scope.messages = $goKey('messages');
  $scope.messages.$sync();

  $scope.user = $goKey('accounts/')


  $scope.notifications = [
  {
    text: "This is a sample notification"
  }
  ];

  $scope.remove = function(array, index){
    console.log(remove);
    array.splice(index, 1);
  }
  
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

