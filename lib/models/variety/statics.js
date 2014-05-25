var util     = require('util');
var mongoose = require('mongoose');

module.exports = function(app, schema) {

  schema.static('findBy', function(params) {
    return this.find().exec();
  });

  schema.static('findOneBy', function(params) {
    return this.findOne({ _id: params.id }).exec();
  });

  schema.static('reduceBy', function(params) {
    var query = this.aggregate();

    if (params.article) {
      query.match({
        // is typeof mongoose's ObjectId, however this
        // is not compatible for doing a equal query
        article: mongoose.Types.ObjectId(params.article)
      });
    }

    query.project({
      article: 1,
      details: 1
    });

    query.group({
      _id: '$article',
      details: {
        $push: '$details'
      }
    });

    return query.exec().then(function(result) {
      result.forEach(function(result) {
        var details = {};

        result.details.forEach(function(detail) {
          for (var key in detail) {
            var value = detail[key];

            if (!util.isArray(details[key])) {
              details[key] = [];
            }
            if (!~details[key].indexOf(value)) {
              details[key].push(value);
            }
          }
        });

        result.details = details;
      });

      return result;
    });
  });

  schema.static('reduceOneBy', function(params) {
    return this.reduceBy(params).then(function(result) {
      return result.pop() || null;
    });
  });

};
