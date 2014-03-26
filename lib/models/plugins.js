var lodash = require('lodash');

exports.findBy = function(schema) {
  schema.static('findBy', function(params, callback) {
    var query = this.find();

    if (lodash.isString(params.search)) {
      search(query, params.search, schema);
    }
    if (lodash.isPlainObject(params.filter)) {
      filter(query, params.filter);
    }

    return query.exec(callback);
  });
};

exports.findOneBy = function(schema) {
  schema.static('findOneBy', function(params, callback) {
    var query = this.findOne();

    if (params.id && params.id.length === 24) {
      query.where('_id', params.id);
    } else {
      return callback();
    }

    return query.exec(callback);
  });
};

exports.toJSON = function(schema) {
  schema.set('toJSON', { transform: transform });
  schema.set('versionKey', '_version');
};

function filter(query, param) {
  lodash.forIn(param, function(value, key) {
    if (lodash.isPlainObject(value)) {
      filter(query, value);
    }
    if (lodash.isString(value)) {
      query.regex(key, new RegExp(value));
    }
  });
}

function search(query, param, schema) {
  lodash.forIn(schema.paths, function(value, key) {
    if (value.instance === 'String') {
      var or = {};

      or[key] = { $regex: new RegExp(value) };

      query.or(or);
    }
  });
}

function transform(document, object) {
  object.id = document._id;

  delete object._id;
  delete object._version;
}
