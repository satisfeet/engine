var mongoose = require('mongoose');

module.exports = function(context, error) {
  if (error instanceof mongoose.Error.CastError) {
    error.status = 400;
    error.expose = false;
  }
  if (error instanceof mongoose.Error.ValidationError) {
    error.status = 400;
    error.expose = false;
  }
};
