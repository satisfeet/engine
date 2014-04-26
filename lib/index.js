var koa = require('koa');

var app = koa();

require('./config')(app);

require('./errors')(app);

require('./caches')(app);

require('./models')(app);

require('./routes')(app);

require('./server')(app);

module.exports = app;
