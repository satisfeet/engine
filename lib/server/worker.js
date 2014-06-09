var fs   = require('fs');
var util = require('util');
var http = require('http');

module.exports = function(app) {

  http.createServer(app.callback()).listen(app.server.port, function() {
    console.log(util.format('listening on port %d', app.server.port));
  });

};
