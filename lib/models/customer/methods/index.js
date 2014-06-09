var lodash = require('lodash');

Object.defineProperty(exports, 'id', {
  get: function() {

  },
  set: function() {

  }
});

Object.defineProperty(exports, 'name', {
  get: function() {

  },
  set: function() {

  }
});

Object.defineProperty(exports, 'email', {
  get: function() {

  },
  set: function() {

  }
});

Object.defineProperty(exports, 'address', {
  get: function() {

  },
  set: function() {

  }
});

exports.toJSON = function() {
  var object = lodash.pick(this, ['name', 'email', 'address']);

  object.id = this.id;

  return object;
};
