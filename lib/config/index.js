var merge      = require('merge');
var etag       = require('koa-etag');
var errors     = require('koa-error');
var logger     = require('koa-logger');
var compress   = require('koa-compress');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  merge(app, require('../../etc/common'));

  if (app.env === 'development') {
    merge(app, require('../../etc/development'));
  }

  if (app.env === 'production') {
    merge(app, require('../../etc/production'));
  }

  if (app.env === 'test') {
    merge(app, require('../../etc/test'));
  } else {
    app.use(logger(app.logger));
  }

  app.use(etag(app.etag));
  app.use(errors(app.errors));
  app.use(compress(app.compress));
  app.use(bodyparser(app.bodyparser));

};
