var koa = require('koa');

var app = koa();

require('./config')(app);

/*
require('./secure')(app);

require('./models')(app);

require('./routes')(app);

require('./errors')(app);
*/

require('./server')(app);

module.exports = app;
