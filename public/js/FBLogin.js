//connect to goinstant
var url = "https://goinstant.net/469216b0e2ee/Flint_Facebook_Login_Test";
var connect = goinstant.connect(url);

var conn;
var room;
var user;

//connect to the database
var userPoolKey;
connect.then(function(result) {
    conn = result.connection;
    room = result.rooms[0];
    userPoolKey = room.key('data');
    return room.self().get();
}).then(function() {
    var loginButton = document.getElementById("FacebookLogin");
    
    loginButton.onclick = function() {
        //login through facebook
        var loginURL = conn.loginUrl('facebook');
        console.log(loginURL);
    }
});