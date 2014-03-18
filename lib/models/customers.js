var lodash = require('lodash');

exports.find = function(params, callback) {
  var query = {};

  if (params.filter) {
    query.$and = [];

    lodash.forIn(params.filter, function(value, key) {
      var object = {};

      object[key] = {
        $regex: new RegExp(value)
      };

      query.$and.push(object);
    });
  }

  this.collection.find(query, function(err, cursor) {
    if (err) return callback(err);

    cursor.toArray(callback);
  });
};

exports.findOne = function(params, callback) {
  var query = {};

  this.collection.findOne(query, callback);
};

exports.create = function(document, callback) {
  this.collection.create(document, callback);
};

exports.update = function(document, callback) {
  this.collection.update(document, callback);
};

exports.remove = function(document, callback) {
  this.collection.remove(document, callback);
};
