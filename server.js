// Ayasdi Inc. Copyright 2014 - all rights reserved.

var http = require('http'),
    express = require('express'),
    port = 4000,
    app = express();
    
app.configure(function () {
  app.use(express.compress());
  app.use(express.urlencoded({limit: '20mb'}));
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/dist'));
  app.use(app.router);
});

http.createServer(app).listen(port, function () { console.log('web server listening on port ' + port); });
