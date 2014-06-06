var mongoose = require('mongoose');

require('./setters')(mongoose);

require('./asserts')(mongoose);

mongoose.plugin(require('./methods'));

mongoose.plugin(require('./options'));
