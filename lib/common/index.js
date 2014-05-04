var qs       = require('koa-qs');
var jwt      = require('koa-jwt');
var json     = require('koa-json');
var etag     = require('koa-etag');
var route    = require('koa-route');
var logger   = require('koa-logger');
var compress = require('koa-compress');
var parser   = require('koa-bodyparser');

const regex = /(?!\/session$)/;

module.exports = function(app) {

  qs(app);

  app.use(require('./cross'));
  app.use(require('./accept'));

  if (app.env === 'production') {
		app.use(compress());
    app.use(logger());
		app.use(etag());
  } else {
    app.use(json());
  }

  app.use(parser(app.parser));

  route.all(regex, jwt(app.account));

};
