var jwt    = require('koa-jwt');
var crypto = require('crypto');

var secret = crypto.randomBytes(128);

module.exports = function *(next) {
  if (!matchesSession(this)) {
    if (!this.app.account.secret) {
      this.app.account.secret = secret.toString('hex');
    }
    try {
      yield jwt(this.app.account).call(this, next);
    } catch(err) {
      if (err.status === 401) err.expose = false;

      throw err;
    }
  }

  yield next;
};

module.exports._name = 'auth';

function matchesSession(context) {
  var isPath = ~['/session'].indexOf(context.path);
  var isMethod = ~['POST', 'OPTIONS'].indexOf(context.method);

  return isPath && isMethod;
}
