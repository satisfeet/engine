var fs         = require('fs');
var jadeify    = require('jadeify');
var shortify   = require('shortify');
var browserify = require('browserify');

module.exports = function(app) {

  var options = app.settings.engine.builder;

  app.get('/javascripts/build.js', function(req, res, next) {
    createBuilder(options).bundle(options, function(err, source) {
      if (err) return next(err);

      fs.writeFile(options.path, source, next);
    });
  });

};

function createBuilder(options) {
  var builder = browserify(options);

  builder.add(options.entry);
  builder.transform(shortify(options.aliases));
  builder.transform(jadeify);

  return builder;
}
