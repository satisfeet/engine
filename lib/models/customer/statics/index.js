var lodash = require('lodash');

exports.findBy = function(params) {
  var query = this.find();

  if (lodash.isString(params.search)) {
    search(query, params.search, this.schema);
  }
  if (lodash.isPlainObject(params.filter)) {
    filter(query, params.filter);
  }

  return query.exec();
};

exports.findOneBy = function(params) {
  var query = this.findOne().where('_id', params.id);

  return query.exec();
};

function filter(query, param) {
  var prefix = '';

  lodash.forIn(param, function transform(value, key) {
    if (lodash.isPlainObject(value)) {
      prefix = key + '.';

      lodash.forIn(value, transform);
    }
    if (lodash.isString(value)) {
      query.regex(prefix + key, new RegExp(value));
    }
  });
}

function search(query, param, schema) {
  lodash.forIn(schema.paths, function(value, key) {
    if (value.instance === 'String') {
      var or = {};

      or[key] = { $regex: new RegExp(param) };

      query.or(or);
    }
  });
}
