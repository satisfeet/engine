var logger = require('koa-logger');

module.exports = function(app) {

  if (app.env !== 'test') {
    app.use(logger());
  }

  require('./auth')(app);

  require('./cache')(app);

  require('./parser')(app);

  app.use(accept);

};

function* accept(next) {
  if (!this.accepts(['json'])) this.throw(406);
  if (!this.acceptsCharsets(['utf-8'])) this.throw(406);

  yield next;
}
