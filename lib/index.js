var koa = require('koa');

var app = koa();

require('./config')(app);

require('./common')(app);

require('./errors')(app);

require('./models')(app);

require('./router')(app);

require('./server')(app);

module.exports = app;
