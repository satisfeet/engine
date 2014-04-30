var http = require('http');
var util = require('util');

module.exports = function(app) {

  http.createServer(app.callback()).listen(app.server.port, function() {
    console.log(util.format('listening on port %d', app.server.port));
  });

};
