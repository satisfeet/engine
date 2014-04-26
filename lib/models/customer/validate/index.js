var joi = require('joi');

var schema = require('./schema');

module.exports = function* validate(next) {
  try {
    yield validate(this.body);
  } catch(error) {
    this.throw(400);
  }

  yield next;
};

function validate(model) {
  return function(callback) {
    joi.validate(model, schema, callback);
  }
}
