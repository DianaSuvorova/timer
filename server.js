// Ayasdi Inc. Copyright 2014 - all rights reserved.

var http = require('http'),
    express = require('express'),
    port = 4000,
    app = express();
    
app.configure(function () {
  app.use(express.compress());
  app.use(express.urlencoded({limit: '20mb'}));
  app.use(express.cookieParser());
  app.use(express.session({secret: 'captainqlivesforever'}));
  app.use(express.static(__dirname + '/dist'));
  app.use(app.router);
});

app.get('*', function (req, res) { res.sendfile('dist/index.html'); });

http.createServer(app).listen(port, function () { console.log('Ayasdi web server listening on port ' + port); });
