var etag       = require('koa-etag');
var router     = require('koa-router');
var compress   = require('koa-compress');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  app.use(bodyparser());

  if (app.env === 'production') {
		app.use(compress());
		app.use(etag());
  }

  app.use(router(app));

};
