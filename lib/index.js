var koa = require('koa');

var app = koa();

require('./config')(app);

require('./models')(app);

require('./server')(app);

module.exports = app;
