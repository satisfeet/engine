var mongoose = require('mongoose');

module.exports = function(app) {

  mongoose.connect(app.storage.url);

  mongoose.plugin(function(schema) {
    schema.set('toJSON', { transform: transform });
    schema.set('versionKey', '_version');
  });

  require('./customer')(app);

};

function transform(model, object) {
  object.id = model._id.toString();

  delete object._id;
  delete object._version;
}
