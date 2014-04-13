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
          data: JSON.stringify({"email": "superrobert9211@gmail.com"}),
          headers: 
          {
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/json;UTF-8'
          }
        }, function (error, response, body) {
        
          if(JSON.parse(response).id) {
                userID= JSON.parse(response).id;
                console.log("userID " +userID);
                res.json(userID);
          }
          else {
                console.log("Error");
                console.log(response);
                console.log(error);
          }
        });
    });
}