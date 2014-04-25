var lodash = require('lodash');

module.exports = function(app) {

  lodash.merge(app, require('../../etc/general'));

  if (app.env === 'production') {
    lodash.merge(app, require('../../etc/production'));
  }

  if (app.env === 'development') {
    lodash.merge(app, require('../../etc/development'));
  }

};
