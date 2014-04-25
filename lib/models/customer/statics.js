var mongoose = require('mongoose');

module.exports = function(app, schema) {

  schema.statics.findOneById = function(id, callback) {
    return this.findOneBy({ id: id }, callback);
  };

};
