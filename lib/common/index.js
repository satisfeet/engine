var qs         = require('koa-qs');
var etag       = require('koa-etag');
var compress   = require('koa-compress');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  qs(app);

  app.use(accept);

  if (app.env === 'production') {
		app.use(compress());
		app.use(etag());
  }

  app.use(bodyparser());

};

function* accept(next) {
  if (!this.accepts('json')) {
    this.throw(406, 'requires type "application/json".');
  }

  this.type = 'json';

  yield next;
}

