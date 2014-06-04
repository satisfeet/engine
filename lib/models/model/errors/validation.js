var util = require('util');

function ValidationError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);

  this.name = 'ValidationError';
  this.message = message;
};

util.inherits(ValidationError, Error);

module.exports = ValidationError;
