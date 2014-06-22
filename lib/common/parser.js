var qs         = require('koa-qs');
var bodyparser = require('koa-bodyparser');

module.exports = function(app) {

  qs(app);

  app.use(bodyparser());

};
