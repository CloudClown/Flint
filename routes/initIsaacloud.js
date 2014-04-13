var request = require('request');
var curl = require('curlrequest');
var userID;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
exports.initIsaacloud = function (req, res) {
    var userEmail = req.body.email;
    console.log(userEmail);
    var accessToken;
    var options = {
        method: 'POST',
        url: 'https://oauth.isaacloud.com/token',
        data: { grant_type:'client_credentials'},
        headers: {
            'Authorization': 'Basic NjE6YzVlMzMwOWVjNGEyNzIzZDUzZjhjNmExODVlMmMz'
        }
  };
  curl.request(options, function (error, response, body) {
      if(!error) {
          accessToken = JSON.parse(response).access_token;
          console.log(accessToken);
      } 
      else {
          console.log("Error");
      }
      curl.request({
          method: "POST",
          url: "https://api.isaacloud.com/v1/admin/users",
          data: JSON.stringify({"email": "ryanw"}),
          headers: 
          {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/json;UTF-8'
          }
        }, function (error, response, body) {
   
          if (response.message != "Constraint violation error" ){
                console.log("User has already been created.");
                res.json(-1);
                console.log(response);
            }
            else if(JSON.parse(response).id != null) {
                userID= JSON.parse(response).id;
                console.log(userID);
                res.json(userID);
            }
            else {
                console.log("Error");
                console.log(response);
            }
        });
    });
}