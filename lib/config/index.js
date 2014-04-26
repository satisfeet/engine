var lodash     = require('lodash');
var etag       = require('koa-etag');
var errors     = require('koa-error');
var logger     = require('koa-logger');
var compress   = require('koa-compress');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  app.use(errors());
  app.use(bodyparser());

  lodash.merge(app, require('../../etc/common'));

  if (app.env === 'development') {
    lodash.merge(app, require('../../etc/development'));
  }

  if (app.env === 'production') {
    lodash.merge(app, require('../../etc/production'));

		app.use(compress());
		app.use(etag());
  }

  if (app.env === 'test') {
    lodash.merge(app, require('../../etc/test'));
  } else {
    app.use(logger());
	}

};
