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

    $scope.displayName = user.displayName;
    $scope.sendMessage = function() {
      var message = {
        content: $scope.messageContent,
        author: user.displayName,
        rating: ""
      };
      // Each method returns a promise, we can use that to confirm that item was
      // added succesfully
      if($scope.messageContent)
    $scope.messages.$add(message).then(function() {
      $scope.messageContent = '';
      $("#messages").animate({ scrollTop: $('#messages')[0].scrollHeight}, 20);

      $scope.points.$value += 1;
      console.log($scope.points.$value);
      $scope.points.$set($scope.points.$value);

      $.get("/isaacloud/getLevel?userID="+$scope.isaacloudID.$value+"&roomID="+room, function( data ) {
        $scope.level = data; 
      });
    });
    }

    var mateId;
    $scope.mateId = $goKey('accounts/' + user.id + '/matches/' + room + '/mateId');
    $scope.mateId.$sync();
    $scope.mateId.$on('ready', function() {
      mateId = $scope.mateId.$value;
      console.log($scope.mateId)

      $scope.messages = $goKey('rooms/' + room + '/messages');
      $scope.messages.$sync();

      $scope.isaacloudID = $goKey('accounts/' + user.id + '/isaacloudID');
      $scope.isaacloudID.$sync();
      $scope.isaacloudID.$on('ready', function() {
        $.get( "/isaacloud/newRoom?userID=" + $scope.isaacloudID.$value + "&roomID=" + room, function( data ) {
          console.log("Returned from isaacloud: " + data);
        });
      });

      $scope.points = $goKey('rooms/' + room + '/' + user.id);
      $scope.points.$sync();
      $scope.points.$on('ready', function() {
        if (!$scope.points.$value)
          $scope.points.$set(0);
      });


    $scope.movies = $goKey('accounts/'+mateId+'/movies');
    $scope.movies.$sync();
    $scope.movies.$on('ready', function() {
      $scope.interests.push({
        title: "Movies",
        level: 1,
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
        level: 2,
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
        level: 3,
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
        level: 4,
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
        level: 5,
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
        level: 6,
        items: [
        $scope.likes[0].name,
        $scope.likes[1].name,
        $scope.likes[2].name,
        ]
      });
    });

    $scope.photos = $goKey('accounts/' + mateId + '/photos');
    $scope.photos.$sync();
    $scope.photos.$on('ready', function()  {
      $scope.photo1 = $scope.photos[0] ;
      $scope.photo2 = $scope.photos[3] ;
      $scope.photo3 = $scope.photos[7] ;
      $scope.photo4 = $scope.photos[13] ;
      console.log($scope.photos)
    });

    });

  });


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

  $scope.upScore = function() {
    points += 5;
  }

  $scope.downScore = function() {
    points -= 5;
  }
  $scope.level = 4;
});

