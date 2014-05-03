var qs         = require('koa-qs');
var json       = require('koa-json');
var etag       = require('koa-etag');
var logger     = require('koa-logger');
var compress   = require('koa-compress');
var basicauth  = require('koa-basic-auth');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  qs(app);

  app.use(cross);
  app.use(accept);

  if (app.env === 'production') {
		app.use(compress());
    app.use(logger());
		app.use(etag());
  } else {
    app.use(json());
  }

  app.use(basicauth(app.account));
  app.use(bodyparser(app.parser));

};

function *cross(next) {
  this.set('Access-Control-Allow-Origin', this.req.headers.origin || 'http://manager.satisfeet.me');
  this.set('Access-Control-Allow-Headers', 'accept,authorization');
  this.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,OPTIONS,DELETE');
  this.set('Access-Control-Allow-Credentials', 'true');

  yield next;
}

function *accept(next) {
  if (!this.accepts('json')) this.throw(406);
  if (!this.acceptsCharsets('utf-8')) this.throw(406);

  yield next;
}
