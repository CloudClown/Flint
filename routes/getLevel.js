var curl = require('curlrequest');
exports.newRoom = function(req, res) {
  var userID = req.query.userID;
  var roomID = req.query.roomID;
  if(roomID == null)
    roomID = 2;
  if(userID == null)
    userID = 52;
  var roomID_str = roomID.toString();
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
        var rIDObj = {}
        rIDObj[roomID_str] = '0';
        var customFieldOps = {
              method: "POST",
              url: "https://api.isaacloud.com/v1/admin/users/"+userID+"/customfields",
              data: JSON.stringify(rIDObj),
              headers: 
              {
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/json;UTF-8'
             }
            };
            console.log(customFieldOps)
            curl.request(customFieldOps, function (error, response, body) {
              if(!error){
                console.log(response);
                res.json(0);
              }
              else {
                console.log("add customfield error");
                res.json(-1);
              }
        });
    } 
    else {
      console.log("Error");
    }
        
  });
}
exports.getLevel = function(req, res) {
  var userID = req.query.userID;
  var roomID = req.query.roomID;
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

    if(!userID) userID =1;
    curl.request({
      method: 'GET',
      url: 'https://api.isaacloud.com/v1/cache/users/' + userID +'/customfields',
      headers: 
      {
        'Authorization': 'Bearer '+ accessToken
      }
    }, function (error, response, body) {
      if (!error) {
        var obj = JSON.parse(response);
        console.log(JSON.parse(obj[roomID.toString()]));
        var ppoint = parseInt(obj[roomID.toString()]);
        if(ppoint > 200)
          res.json(10);
        else if(ppoint > 160)
          res.json(9);
        else if(ppoint > 140)
          res.json(8);
        else if(ppoint > 120)
          res.json(7);
        else if(ppoint > 80)
          res.json(6);
        else if(ppoint > 40)
          res.json(5);
        else if(ppoint > 20)
          res.json(4);
        else if(ppoint > 10)
          res.json(3);
        else if(ppoint > 10)
          res.json(2);
        else if(ppoint > 1)
          res.json(1);
      }
      else {
        console.log("Error");
      }
    });

  });
}

exports.updatePoints = function(req, res) {
  var userID = req.query.userID;
  var roomID = req.query.roomID;
  var newPoints = req.query.newPoints;
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
        if(!userID) userID = 54;
        if(!newPoints) newPoints = 1;
        if(!roomID) roomID = 26;
        var roomID_str = roomID.toString();
        var rIDObj = {}
        rIDObj[roomID_str] = newPoints.toString();
        curl.request({
            method: 'PUT',
            url: 'https://api.isaacloud.com/v1/cache/users/' + userID + '/customFields',
            data: JSON.stringify(rIDObj),
            headers: 
            {
             'Authorization': 'Bearer '+ accessToken
            }
          }, function (error, response, body) {
              if (!error) {
                console.log("succeeded");
                res.json(0);
              }
              else
              {
                console.log("error");
                console.log(response);
                res.json(-1);
              }
          });
        }
        else
        {
          console.log("error");
        }
  });
}
    

exports.getPoints = function(req, res) {
        var userID = req.query.userID;
        if(!userID) userID = 54;
        var roomID = req.query.roomID;
        if(!roomID) roomID = 26;
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
        curl.request({
          method: 'GET',
          url: 'https://api.isaacloud.com/v1/cache/users/' + userID + '/customfields',
          headers: 
          {
            'Authorization': 'Bearer '+ accessToken
          }
        }, function (error, response, body) {
            if(!error){
              var obj = JSON.parse(response);
              var currPoint = parseInt(obj[roomID.toString()]);
              res.json(currPoint);
            }
            else {console.log("error");}
          });
        }
      });
}
