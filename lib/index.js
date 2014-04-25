var koa = require('koa');

var app = koa();

require('./config')(app);

require('./models')(app);

require('./routes')(app);

if (!module.parent) {
  require('./server')(app);
}

module.exports = app;
