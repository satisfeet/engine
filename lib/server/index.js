var http = require('http');
var util = require('util');

module.exports = function(app) {

  var options = app.settings.server;

  http.createServer(app).listen(options.port, options.ip, function() {
    console.log(util.format('listening on %s %s', options.port, options.ip));
  });

};
