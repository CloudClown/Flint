var males = [
{ "id":1, "firstName":"John" , "lastName":"Doe", "counter": 0 }, 
{ "id":2, "firstName":"Anthony" , "lastName":"Smith", "counter": 0 }, 
{ "id":3, "firstName":"Peter" , "lastName": "Jones", "counter": 0 }
];
var females = [
{ "id":4, "firstName":"Jane" , "lastName":"Doe", "counter": 0  }, 
{ "id":5, "firstName":"Anna" , "lastName":"Smith", "counter": 0  }, 
{ "id":6, "firstName":"Portia" , "lastName": "Jones", "counter": 0  }
];

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

      } else {
        // user is logged out
      }
    });

    var connectUrl = 'https://goinstant.net/469216b0e2ee/Flint';
    var connect = goinstant.connect(connectUrl);
    var room, counter, accounts, accountsValue, currCounter;
    connect.then(function(res) {
      //$(".parentDiv").append(res);
      console.log(res);
      //console.log(res.rooms[1]);
      room = res.rooms[0];
      counter = room.key('counter');
      accounts = room.key('accounts');

      //counter.remove();
      counter.get(function(err, value) {
        if(value == null) counter.set(0);
        else counter.set(value+1);
        console.log("Work?");
        console.log(value);
        currCounter = value;
      });
      
      
    //}).then(function(res) {
    //  items = res.value || 0;
    //  acount = accounts.value || [];
    //  _.each(items, _printItem);
    //  _.each(items, _printAccount);
    //}).finally(function(){
    //  counter.on('set',{local: true}, _handleSet);
    //  accounts.on('add', {local: true}, _handleAdd);
      
    });

    function _printItem(item, id) {
      console.log("Print Item:");
      console.log(id);
      console.log(item);
    }
    function _printAccount(item, id) {
      console.log("Print Item:");
      console.log(id);
      console.log(item);
    }
    function _handleSet(item, id, context) {
      console.log("Handle Item:");
      if(!_.isString(id)) {
        context = id;
        id = _idFromKey(context.key);
      }
      console.log(id);
      console.log(item);
    }

    function _idFromKey(key) {
        var value = key;
        return value;
      }

    function match(dots) {
      clearInterval(dots);
      var userGender, user;
      var gender;
      connect.then(function(res) {
        room = res.rooms[0];
        accounts = room.key('accounts');
        
        currUserId = currUserId.replace('facebook:','');
        console.log(currUserId);
        user = room.key('accounts/' + currUserId);
        userGender = room.key('accounts/' + currUserId + '/gender');
        userGender.get(function(err, value) {
          console.log(value);
          gender = value;
           accounts.get(function(err, value) {
        console.log(value);
        accountsValue = value;
        console.log(accountsValue);
        var arrayId = [];
        for(var id in accountsValue) {
          if(id != currUserId) arrayId.push(id);
        }
        var length = arrayId.length;
        while(true) {
          var random = Math.floor(Math.random()*length);
          if(accountsValue[arrayId[random]].gender == gender) {
          var match = user.key('matches');
          match.get(function(err, value) {
            //if(value == null) value = [];
            var matchRoom = match.key(currCounter.toString()); 
            var matchRoomNew = matchRoom.key('mateId');
            matchRoomNew.set(accountsValue[arrayId[random]].facebookId);
            console.log(accountsValue[arrayId[random]].facebookId);

            var mate = room.key('accounts/' + accountsValue[arrayId[random]].facebookId);
            var mateMatchRoom = mate.key('matches/'+currCounter.toString()); 
            var mateMatchRoomNew = mateMatchRoom.key('mateId');
            mateMatchRoomNew.set(currUserId);
            //var matchRoom = {};
            //matchRoom[currCounter.toString()] =  {"mateId": accountsValue[arrayId[random]].facebookId};
            //value.push(matchRoom);
            //match.add(matchRoom);
          });
          break;
        }
      }
      //document.location.href = "/chat?room=" + currCounter;
      });
        });
      });
      
      

      //females[random].counter++;
      //$(".parentDiv").append("The person you matched to is: " + firstName + " " + lastName + "<br>");
      //document.location.href = "index.html";
      //"/room/" + females[random].counter;
    }

    $( document ).ready(function() {
      $( "#buttonMatch" ).click(
        function(event) {
        document.body.style.backgroundImage="url('/img/couple_in_color.jpg')";
        var dots = window.setInterval(function() {
        var wait = document.getElementById("wait");
        if ( wait.innerHTML.length > 4 ) 
            wait.innerHTML = "";
        else 
            wait.innerHTML += ".";
        }, 1000);
        document.getElementById("buttonMatch").remove();
        window.setTimeout(function() {match(dots);},6000);
        return false;
      });       
    });
