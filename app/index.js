var page = require('page');

var app = page;

require('./element')(app);

require('./routes')(app);

app();
