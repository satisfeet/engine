var lodash = require('lodash');

exports.filter = function(value, query) {
 if (lodash.isPlainObject(value)) {
    var prefix = '';
    lodash.forIn(value, function filter(value, key) {
      if (lodash.isPlainObject(value)) {
        prefix = key + '.';
        lodash.forIn(value, filter);
      } else {
        query[prefix + key] = new RegExp(value);
      }
    });
  }
};

exports.search = function(value, query) {
  if (lodash.isString(value)) {
    var regex = new RegExp(value);

    query.$or = [
      { name: regex },
      { email: regex },
      { company: regex },
      { address: { city: regex } },
      { address: { street: regex } }
    ];
  }
};
