exports.toJSON = function(schema) {
  schema.set('toJSON', { transform: transform });
  schema.set('versionKey', '_version');
};

function transform(document, object) {
  object.id = document._id;

  delete object._id;
  delete object._version;
}
