module.exports = function(app, schema) {

  schema.static('reduceBy', function(params) {
    return this.mapReduce({
      map: map,
      reduce: reduce
    }).then(function(result) {
      return result.map(function(result) {
        return {
          article: result._id,
          details: result.value
        };
      });
    });
  });

  schema.static('reduceOneBy', function(params) {
    return this.reduceBy(params)
      .then(function(result) {
        return result.pop();
      });
  });

};

function map() {
  for (var key in this.details) {
    this.details[key] = [this.details[key]];
  }

  emit(this.article, this.details);
}

function reduce(article, details) {
  var result = {};

  details.forEach(function(detail) {
    for (var key in detail) {
      if (!Array.isArray(result[key])) result[key] = [];
      if (~result[key].indexOf(detail[key])) result[key].concat(detail[key]);
    }
  });

  return result;
}
