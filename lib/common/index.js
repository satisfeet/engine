var qs          = require('koa-qs');
var json        = require('koa-json');
var etag        = require('koa-etag');
var logger      = require('koa-logger');
var compress    = require('koa-compress');
var basicauth   = require('koa-basic-auth');
var bodyparser  = require('koa-bodyparser');
var conditional = require('koa-conditional-get');

module.exports = function(app) {

  qs(app);

  app.use(function *(next) {
    if (this.method !== 'OPTIONS') return yield next;

    this.status = 204;
  });

  app.use(basicauth(app.auth));

  app.use(require('./cross'));
  app.use(require('./accept'));

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
