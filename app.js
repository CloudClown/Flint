/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var getLevel = require('./routes/getLevel');
var initIsaacloud = require('./routes/initIsaacloud');
var http = require('http');
var path = require('path');
var sass = require('node-sass');
var app = express();

var flintTwilio = require('./routes/flint-twilio');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

app.use(
    sass.middleware({
        src: __dirname + '/public', //where the sass files are
        dest: __dirname + '/public', //where css should go
        debug: true // obvious
    })
);

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
    app.locals.pretty = true;
}

app.get('/', routes.index);
app.get('/isaacloud/getLevel', getLevel.getLevel);
app.put('/isaacloud/updatePoints', getLevel.updatePoints);
app.get('/isaacloud/newRoom', getLevel.newRoom);
app.get('/isaacloud/getPoints', getLevel.getPoints);
app.post('/isaacloud/init', initIsaacloud.initIsaacloud);
app.get('/match', routes.match);
app.get('/chat', routes.chat);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
