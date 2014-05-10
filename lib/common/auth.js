var jwt = require('koa-jwt');

module.exports = function *(next) {
  if (!matchesSession(this)) {
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
