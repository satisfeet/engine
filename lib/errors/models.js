var mongoose = require('mongoose');

module.exports = function *(next) {
  try {
    yield next;
  } catch(err) {
    if (err instanceof mongoose.Error.CastError) {
      err.status = 400;
      err.expose = false;
    }
    if (err instanceof mongoose.Error.ValidationError) {
      err.status = 400;
      err.expose = false;
    }

    throw err;
  }
};

module.exports._name = 'models:error';
