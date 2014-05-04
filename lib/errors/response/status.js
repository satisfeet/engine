var http = require('http');

module.exports = function *(next) {
  try {
    yield next;

    if (this.status === 404 || this.status === null) this.throw(404);
  } catch(err) {
    if (http.STATUS_CODES[err.status]) {
      this.status = err.status;
    } else {
      this.status = 500;
    }

    throw err;
  }
};

module.exports._name = 'error:status';
