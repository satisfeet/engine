var express = require('express');

var app = express();

require('./config')(app);

module.exports = app;
