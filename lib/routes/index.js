var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  require('./orders')(app);

  require('./products')(app);

  require('./customers')(app);

  app.get('/', function *(next) {
    this.status = 204;
  });

};
