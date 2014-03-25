var express = require('express');

var app = express();

require('./config')(app);

require('./models')(app);

require('./routes')(app);

require('./errors')(app);

require('./server')(app);

module.exports = app;
