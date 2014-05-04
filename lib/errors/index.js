var http     = require('http');
var mongoose = require('mongoose');

module.exports = function(app) {

  app.on('error', function(err) {
    if (err.status >= 400 && err.status < 500) return;

    console.error(err.stack);
  });

  require('./response')(app);

  app.use(require('./models'));

};
