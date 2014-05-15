var jwt    = require('koa-jwt');
var crypto = require('crypto');

module.exports = function *(next) {
  checkSecret(this);

  if (!matchesSession(this)) {
    try {
      yield jwt(this.app.security).call(this, next);
    } catch(err) {
      if (err.status === 401) err.expose = false;

      throw err;
    }
  }

  yield next;
};

module.exports._name = 'auth';

function checkSecret(context) {
  var security = context.app.security;

  if (!security.secret) {
    security.secret = crypto.randomBytes(128).toString('hex');
  }
}

function matchesSession(context) {
  var isPath = context.path === '/session';
  var isMethod = context.method === 'POST';

  return context.method === 'OPTIONS' || isPath && isMethod;
}
