sid = 'ACe575cf5a566534aafd71712034b3e251';
authToken = 'ce4d14ad499458eb800b6dc3c9d97de8'
var twilioClient = require('twilio')(sid, authToken);

exports.flintTwilio = function(req, res) {
    
    //expecting text content and phone number 
    var number = req.body.textTo;
    var text = req.body.text;
    
    twilioClient.sendMessage({
        to: "+1"+number,
        from: "+14243321519",
        body: text
    });
    
};
