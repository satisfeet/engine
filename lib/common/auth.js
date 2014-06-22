var basicauth = require('basic-auth');

module.exports = function(app) {

  app.use(auth);

};

function* auth(next) {
  var auth = basicauth(this);

  if (!auth) this.throw(401);
  if (auth.name !== this.app.auth.username) this.throw(401);
  if (auth.pass !== this.app.auth.password) this.throw(401);

  yield next;
}
