var http = require('http');
var util = require('util');

module.exports = function(app) {

  var options = app.settings.server;

  http.createServer(app).listen(options.port, function() {
    console.log(util.format('listening on port %d', options.port));
  });

};
