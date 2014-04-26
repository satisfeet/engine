var errors = require('koa-error');
var logger = require('koa-logger');

module.exports = function(app) {

  app.use(errors());

  if (app.env !== 'test') {
    app.use(logger());
	}

};
