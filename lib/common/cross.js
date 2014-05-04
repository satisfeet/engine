const ORIGIN      = 'http://manager.satisfeet.me';
const HEADERS     = 'Accept, Authorization';
const METHODS     = 'GET, HEAD, PUT, POST, DELETE';
const CREDENTIALS = 'true';

module.exports = function *(next) {
  this.set('Access-Control-Allow-Origin', this.req.headers.origin || ORIGIN);
  this.set('Access-Control-Allow-Headers', HEADERS);
  this.set('Access-Control-Allow-Methods', METHODS);
  this.set('Access-Control-Allow-Credentials', CREDENTIALS);

  yield next;
};

module.exports._name = 'cross';
