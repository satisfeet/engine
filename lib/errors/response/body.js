var http = require('http');

module.exports = function *(next) {
  try {
    yield next;
  } catch(err) {
    if (this.app.env === 'production') {
      this.body = { error: http.STATUS_CODES[this.status] };
    } else {
      this.body = { error: err.toString() };
    }

    throw err;
  }
};

module.exports._name = 'error:body';
