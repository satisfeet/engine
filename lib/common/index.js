var qs          = require('koa-qs');
var json        = require('koa-json');
var etag        = require('koa-etag');
var logger      = require('koa-logger');
var compress    = require('koa-compress');
var basicauth   = require('koa-basic-auth');
var bodyparser  = require('koa-bodyparser');
var conditional = require('koa-conditional-get');

const FORMATS  = ['json'];
const CHARSETS = ['utf-8'];

module.exports = function(app) {

  qs(app);

  app.use(basicauth(app.auth));

  app.use(accept);

  if (app.env === 'production') {
    app.use(logger());
  } else {
    app.use(json());
  }

  app.use(conditional());
  app.use(bodyparser());
  app.use(compress());
  app.use(etag());

};

function* accept(next) {
  if (!this.accepts(FORMATS)) this.throw(406);
  if (!this.acceptsCharsets(CHARSETS)) this.throw(406);

  yield next;
}
