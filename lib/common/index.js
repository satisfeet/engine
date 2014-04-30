var qs         = require('koa-qs');
var json       = require('koa-json');
var etag       = require('koa-etag');
var loggger    = require('koa-logger');
var compress   = require('koa-compress');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  qs(app);

  app.use(accept);

  if (app.env === 'production') {
		app.use(compress());
    app.use(logger());
		app.use(etag());
  } else {
    app.use(json());
  }

  app.use(bodyparser());

};

function* accept(next) {
  if (!this.accepts('json')) {
    this.throw(406);
  }

  this.type = 'json';

  yield next;
}

