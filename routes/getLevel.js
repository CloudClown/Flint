var curl = require('curlrequest');

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
      url: 'https://api.isaacloud.com/v1/cache/users/' + userID,
      headers: 
      {
        'Authorization': 'Bearer '+ accessToken
      }
    }, function (error, response, body) {
      if (!error) {
        var all_points = JSON.parse(response).customFields;
        var ppoint = all_points.roomID;
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
        else if(ppoing > 1)
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
  var newpoints = req.query.newPoints;
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
      method: 'POST',
      url: 'https://api.isaacloud.com/v1/cache/users/' + userID,
      data: {customFields:{ roomID: newPoints }},
      headers: 
      {
        'Authorization': 'Bearer '+ accessToken
      }
    }, function (error, response, body) {
      if (!error) {
       
    });

  });
}

