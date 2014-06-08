var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  require('./orders')(app);

  require('./session')(app);

  require('./products')(app);

  require('./customers')(app);

  app.get('/', function *(next) {
    this.status = 204;
  });

  app.options('*', function *(next) {
    this.status = 204;
  });

};
