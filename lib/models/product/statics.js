var mongoose = require('mongoose');

module.exports = function(app, schema) {

  schema.static('findBy', function(params) {
    var query = this.find();

    query.populate('articles');

    return query.exec();
  });

  schema.static('findOneBy', function(params) {
    var query = this.findOne({ _id: params.id });

    query.populate('articles');

    return query.exec();
  });

};
