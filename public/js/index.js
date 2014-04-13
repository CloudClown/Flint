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

var connectUrl = 'https://goinstant.net/469216b0e2ee/UserList';
var connect = goinstant.connect(connectUrl);
var room, counter, accounts;
connect.then(function(res) {
  //$(".parentDiv").append(res);
  console.log(res);
  //console.log(res.rooms[1]);
  room = res.rooms[0];
  counter = room.key('/counter');
  accounts = room.key('/accounts');
  //counter.remove();
  counter.get(function(err, value) {

  });
  //}).then(function(res) {
  //	items = res.value || 0;
  //	acount = accounts.value || [];
  //	_.each(items, _printItem);
  //	_.each(items, _printAccount);
  //}).finally(function(){
  //	counter.on('set',{local: true}, _handleSet);
  //	accounts.on('add', {local: true}, _handleAdd);
counter.set(items+1);
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
  clearInterval(dots)
    var length = females.length;
  var random = Math.floor(Math.random()*length);
  var firstName = females[random].firstName;
  var lastName = females[random].lastName;
  females[random].counter++;
  $(".parentDiv").append("The person you matched to is: " + firstName + " " + lastName + "<br>");
  document.location.href = "/match";
  //"/room/" + females[random].counter;
}

$( document ).ready(function() {
      console.log("CLICKED");
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

