var lodash   = require('lodash');
var mongoose = require('mongoose');

module.exports = function(schema) {
  schema.set('toJSON', {
    virtuals: true,
    transform: transform
  });
  schema.set('versionKey', '_version');
};

function transform(model, object) {
  object.id = model._id;

  delete object._id;
  delete object._version;

  lodash.forIn(object, function map(value, key, obj) {
    if (lodash.isPlainObject(value)) {
      lodash.forIn(value, map);
    }
    if (lodash.isArray(value)) {
      lodash.forEach(value, map);
    }
    if (value instanceof Date) {
      obj[key] = value.toString();
    }
    if (value instanceof mongoose.mongo.ObjectID) {
      obj[key] = value.toString();
    }
  });
}
