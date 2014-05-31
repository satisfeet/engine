exports.findBy = function(params) {
  return this.find().exec();
};

exports.findOneBy = function(params) {
  return this.findOne({ _id: params.id }).exec();
};
