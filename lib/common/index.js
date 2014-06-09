var basicauth = require('basic-auth');

const FORMATS  = ['json'];
const CHARSETS = ['utf-8'];

module.exports = function(app) {

  require('koa-qs')(app);

  app.use(auth);
  app.use(accept);

  if (app.env === 'production') {
    app.use(require('koa-logger')());
  }

  app.use(require('koa-conditional-get')());
  app.use(require('koa-bodyparser')());
  app.use(require('koa-compress')());
  app.use(require('koa-etag')());

};

function* auth(next) {
  var auth = basicauth(this);

  if (!auth) this.throw(401);
  if (auth.name !== this.app.auth.username) this.throw(401);
  if (auth.pass !== this.app.auth.password) this.throw(401);

  yield next;
}

function* accept(next) {
  if (!this.accepts(FORMATS)) this.throw(406);
  if (!this.acceptsCharsets(CHARSETS)) this.throw(406);

  yield next;
}
