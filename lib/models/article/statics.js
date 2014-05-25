module.exports = function(app, schema) {

  schema.static('findBy', function(params) {
    return this.find().exec();
  });

  schema.static('findOneBy', function(params) {
    return this.findOne({ _id: params.id }).exec();
  });

};
