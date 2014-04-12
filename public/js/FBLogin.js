$(document).ready(function() {

    var firebaseDataReference = new Firebase('https://flint.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(firebaseDataReference, function(error, user) {
        if (error) {
            // an error occurred while attempting login
            console.log(error);
        } else if (user) {
            // user authenticated with Firebase
            //console.log(user);
            //facebook api
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '1404685476473865',
                    status     : true,
                    xfbml      : true
                });
                
                var accessToken = user.accessToken;
                console.log("access token:" + accessToken);
                
                var FBData = {
                    facebookId: user.id
                };
                //return FB data in promises
                var userStr = '/'+user.id;
                FB.api(userStr+'/name','GET',{access_token: accessToken},function(response) {
                    console.log("response generated!");
                    console.log(response);
                    //get name 
                    
                });
                
            };
            
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            
        } else {
            // user is logged out
            console.log('User is logged out');
        }
    });

    
    var loginButton = document.getElementById("FacebookLogin");
    loginButton.onclick = function() {

        auth.login('facebook', {
            scope:"user_interests,user_likes,email,user_location,user_about_me,user_hometown,user_photos"
        });
    };

    var logoutButton = document.getElementById("FacebookLogout");
    logoutButton.onclick = function() {
        auth.logout();
    };

});

