var etag        = require('koa-etag');
var conditional = require('koa-conditional-get');

module.exports = function(app) {

  if (app.env === 'production') {
    app.use(conditional());
    app.use(etag());
  }

};
