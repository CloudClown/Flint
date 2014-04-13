    var chatRef = new Firebase('https://flint.firebaseio.com');
    var currUserId;
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
        currUserId = user.uid;
        currUserId = currUserId.replace('facebook:','');
      } else {
        // user is logged out
      }
    });

    var connectUrl = 'https://goinstant.net/469216b0e2ee/Flint';
    var connect = goinstant.connect(connectUrl);
    var room, user;
	connect.then(function(res) {
      room = res.rooms[0];
      user = room.key('accounts/' + currUserId + '/matches');
      user.get(function(err, value) {
      	if(value == null) {
      		var $li = $('<li data-empty="true"> There are no matches yet, add one! </li>');
      		$('#list').append($li);
      	} else {
      		console.log(value);
      		for(var l in value) {
      			var matchList = room.key('accounts/' + value[l]['mateId'] + '/name');

      			matchList.get(function(err, val) {
      				var $li = $('<li>'+ val + '</li>');
      				console.log(l);
      				var randomColor = Math.floor(Math.random()*16777215).toString(16);
      				var $colorBlock = $("<a href=\"/chat?room=" + l + "\"><div style=\"background-color:#" + randomColor + "; width:34px; height:34px;\"></div></a>");
	    			$li.prepend($colorBlock);
	    			$('#list').append($li);
      			});
      		}
      	}
      });
  });