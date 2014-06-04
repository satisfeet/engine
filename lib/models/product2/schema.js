var joi = require('joi');

module.exports = function(value) {
  var schema = {

  };
};

exports.title = function(value) {
  joi.validate(value, title, function(err) {
    if (err) throw err;
  });
};
var schema = joi
  .object()
    .required();

schema.title = joi
  .string()
    .required()
    .min(4)
    .max(30)
    .regex(alpha);

schema.details = joi
  .object()
    .optional();

schema.pricing = joi
  .object()
    .required()
    .keys({
      retail: joi
        .number()
          .required()
          .min(0)
    });

schema.articles = joi
  .array()
    .required();
