var qs          = require('koa-qs');
var json        = require('koa-json');
var etag        = require('koa-etag');
var logger      = require('koa-logger');
var compress    = require('koa-compress');
var bodyparser  = require('koa-bodyparser');
var conditional = require('koa-conditional-get');

module.exports = function(app) {

  qs(app);

  app.use(require('./cross'));
  app.use(require('./accept'));
  app.use(require('./auth'));

  if (app.env === 'production') {
    app.use(conditional());
    app.use(compress());
    app.use(logger());
    app.use(etag());
  } else {
    app.use(json());
  }

  app.use(bodyparser(app.parser));

};
