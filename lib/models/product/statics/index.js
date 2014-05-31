exports.findBy = function(params) {
  return this.find().populate('articles').exec();
};

exports.findOneBy = function(params) {
  var query = { _id: params.id };

  return this.findOne(query).populate('articles').exec();
};
