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

  // lets make life easier and disable
  // authentication during development
  if (app.env !== 'development') {
    app.use(require('./auth'));
  }
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
