var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  require('./customers')(app);

};
