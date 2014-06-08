var path   = require('path');
var lodash = require('lodash');

module.exports = function(app) {

  lodash.merge(app, require('../../etc/common'));

  if (app.env === 'development') {
    lodash.merge(app, require('../../etc/development'));
  }

  if (app.env === 'production') {
    lodash.merge(app, require('../../etc/production'));
  }

  if (app.env === 'test') {
    lodash.merge(app, require('../../etc/test'));
  }

  lodash.forIn(app, resolve);

};

function resolve(value, index, source) {
  if (lodash.isString(value) && !value.indexOf('/')) {
    source[index] = path.join(__dirname + '/../../', value);
  }
  if (lodash.isArray(value)) {
    lodash.forEach(value, resolve);
  }
  if (lodash.isPlainObject(value)) {
    lodash.forIn(value, resolve);
  }
}
