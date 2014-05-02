var http     = require('http');
var mongoose = require('mongoose');

var CastError       = mongoose.Error.CastError;
var ValidationError = mongoose.Error.ValidationError;

module.exports = function(app) {

  app.on('error', function(error) {
    if (error.status === 400) return;
    if (error.status === 401) return;
    if (error.status === 404) return;

    console.error(error.stack);
  });

  app.use(function *error(next) {
    try {
      yield next;

      if (this.status === null) this.throw(404);
    } catch(err) {
      if (err instanceof CastError) err.status = 400;
      if (err instanceof ValidationError) err.status = 400;

      this.status = err.status || 500;
      if (app.env === 'production') {
        this.body = { error: http.STATUS_CODES[this.status] };
      } else {
        this.body = { error: err.toString() };
      }

      this.app.emit('error', err, this);
    }
  });

};
