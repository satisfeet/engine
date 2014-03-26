var http = require('http');

module.exports = function(app) {

  app.listen(app.settings.port);

};
