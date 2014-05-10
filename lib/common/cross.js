const ORIGIN      = 'http://manager.satisfeet.me';
const HEADERS     = 'Accept, Authorization, Content-Type';
const METHODS     = 'GET, HEAD, PUT, POST, DELETE, OPTIONS';

module.exports = function *(next) {
  this.set('Access-Control-Allow-Origin', this.req.headers.origin || ORIGIN);
  this.set('Access-Control-Allow-Headers', HEADERS);
  this.set('Access-Control-Allow-Methods', METHODS);

  yield next;
};

module.exports._name = 'cross';
