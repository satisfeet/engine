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
  var isPath = context.path === '/session';
  var isMethod = context.method === 'POST';

  return isPath && isMethod;
}
