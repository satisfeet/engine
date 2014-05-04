var http     = require('http');
var mongoose = require('mongoose');

var CastError       = mongoose.Error.CastError;
var ValidationError = mongoose.Error.ValidationError;

module.exports = function(app) {

  app.on('error', function(error) {
    if (error.status >= 400 && error.status < 500) return;

    console.error(error.stack);
  });

  app.use(function *error(next) {
    try {
      yield next;

      if (this.status === null) this.throw(404);
    } catch(error) {
      require('./models')(this, error);

      this.status = error.status || 500;

      if (error.expose === false) return;
      if (this.app.env === 'production') {
        this.body = { error: http.STATUS_CODES[this.status] };
      } else {
        this.body = { error: error.toString() };
      }

      this.app.emit('error', error, this);
    }
  });

};
