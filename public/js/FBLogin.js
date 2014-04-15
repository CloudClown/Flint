$(document).ready(function() {

    var firebaseDataReference = new Firebase('https://flint.firebaseio.com/');

    var auth = new FirebaseSimpleLogin(firebaseDataReference, function(error, user) {
        if (error) {
            // an error occurred while attempting login
            console.log(error);
            console.log('error');
        } else if (user) {
            $( "#FacebookLogin" ).addClass( 'hidden' );
            $( "#FacebookLogout" ).removeClass( 'hidden' );
            $( "#buttonMatch" ).removeClass( 'hidden' );

            // user authenticated with Firebase
            //console.log(user);
            //facebook api
            window.fbAsyncInit = function() {
                FB.init({
                    appId      : '1404685476473865',
                    status     : true,
                    xfbml      : true
                });
                
                var at = {access_token:user.accessToken};
                //console.log("access token:" + at.access_token);
                var userStr = '/'+user.id;
                var FBData = {
                    facebookId: user.id,
                    matched: "-1"
                };
                
                FB.api(userStr,'GET',
                       {fields:'email,gender,id,name,music,movies,television,hometown,languages,books,photos,likes,location,picture',access_token:at.access_token}, function(r) {
                           //console.log(r);
                           //process all data
                           //gender
                           FBData.gender = r.gender ? r.gender : null;
                           //hometown
                           if (r.hometown) {
                               FBData.hometown = r.hometown.name ? r.hometown.name : null;
                           } else {
                               FBData.hometown = null;
                           }
                           //languages
                           FBData.languages = [];
                           if (r.languages) {
                               var l;
                               for (l in r.languages) {
                                   FBData.languages.push(r.languages[l].name);
                               }
                           } 
                           //likes
                           FBData.likes = [];
                           if (r.likes && r.likes.data) {
                               var like;
                               for (like in r.likes.data) {
                                   FBData.likes.push(r.likes.data[like]);
                               }
                           } 
                           //location
                           if (r.location) {
                               FBData.location = r.location.name ? r.location.name : null;
                           } else {
                               FBData.location = null;
                           }
                           //movies
                           FBData.movies = [];
                           if (r.movies && r.movies.data) {
                               var movie;
                               for (movie in r.movies.data) {
                                   FBData.movies.push(r.movies.data[movie].name);
                               }
                           }
                           //music
                           FBData.music = [];
                           if (r.music && r.music.data) {
                               var mu;
                               for (mu in r.music.data) {
                                   FBData.music.push(r.music.data[mu].name);
                               }
                           }
                           //email
                           FBData.email = r.email ? r.email : null;
                           //name
                           FBData.name = r.name ? r.name : null;
                           //photos
                           FBData.photos = [];
                           if (r.photos && r.photos.data) {
                               var photo;
                               for (photo in r.photos.data) {
                                   FBData.photos.push(r.photos.data[photo].source);
                               }
                           }
                           //profile picture
                           if (r.picture && r.picture.data) {
                               FBData.profilepic = r.picture.data.url ? r.picture.data.url : null;
                           } else {
                               r.picture = null;
                           }
                           //television
                           FBData.television = [];
                           if (r.television && r.television.data) {
                               var tv;
                               for (tv in r.television.data) {
                                   FBData.television.push(r.television.data[tv].name);
                               }
                           }
                           //console.log(FBData);
                          
                           
                           //push data to goInstant
                           var GoInstantURL = "https://goinstant.net/469216b0e2ee/Flint";
                           var GoInstantConnect = goinstant.connect(GoInstantURL);
                           GoInstantConnect.then(function(result) {
                               var room = result.rooms[0];
                               var accountsKey = room.key('accounts/'+FBData.facebookId);
                               
                               //check if the user exists already
                               accountsKey.get(function(err, value) {             
                                    //var phoneNumber = prompt("Your Phone Number is What They Eventually Want", "xxx-xxx-xxxx");
                                    //if (phoneNumber) {
                                      //console.log(phoneNumber);
                                      //FBData.phoneNumber = phoneNumber;
                                    //}
                                    accountsKey.set(FBData);
                               });                               
                               return room.self().get();
                           });
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
        scope:"user_interests,user_likes,email,user_location,user_about_me,user_hometown,user_photos,user_actions.books"
      });
      $( "#FacebookLogin" ).addClass( 'hidden' );
      $( "#FacebookLogout" ).removeClass( 'hidden' );
      $( "#buttonMatch" ).removeClass( 'hidden' );
    };

    var logoutButton = document.getElementById("FacebookLogout");
    logoutButton.onclick = function() {

      auth.logout();
      $( "#FacebookLogin" ).removeClass( 'hidden' );
      $( "#FacebookLogout" ).addClass( 'hidden' );
      $( "#buttonMatch" ).addClass( 'hidden' );
    };

});

