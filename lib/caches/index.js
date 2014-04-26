var etag     = require('koa-etag');
var compress = require('koa-compress');

module.exports = function(app) {

  if (app.env === 'production') {
		app.use(compress());
		app.use(etag());
  }

};
