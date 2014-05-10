var router = require('koa-router');

module.exports = function(app) {

  app.use(router(app));

  require('./common')(app);

  require('./orders')(app);

  require('./session')(app);

  require('./products')(app);

  require('./customers')(app);

};
