var merge = require('merge');

module.exports = function(app) {

  merge(app, require('../../etc/general'));

  if (app.env === 'production') {
    merge(app, require('../../etc/production'));
  }

  if (app.env === 'development') {
    merge(app, require('../../etc/development'));
  }

};
