var fs    = require('fs');
var util  = require('util');
var https = require('https');

module.exports = function(app) {

  createServer(app).listen(app.server.port, function() {
    console.log(util.format('listening on port %d', app.server.port));
  });

};

function createServer(app) {
  var options = {
    pfx: fs.readFileSync(app.server.cert.path)
  };

  return https.createServer(options, app.callback());
}
