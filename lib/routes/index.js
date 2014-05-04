var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  app.get('/', function *(next) {
    this.status = 204;
  });

  require('./orders')(app);

  require('./session')(app);

  require('./products')(app);

  require('./customers')(app);

};
