var joi = require('joi');

var alpha = /[-\sa-zA-Z]+$/;

exports.name = joi
  .string()
    .required()
    .max(30)
    .regex(alpha);

exports.email = joi
  .string()
    .required()
    .min(6)
    .email();

exports.company = joi
  .string()
    .optional()
    .min(4)
    .max(30)
    .regex(alpha);

exports.address = joi
  .object()
    .optional()
    .keys({
      street: joi
        .string()
          .required()
          .min(5),
      city: joi
        .string()
          .required()
          .min(4)
          .alphanum(),
      zip: joi
        .number()
          .required()
          .min(10000)
          .max(99999)
    });

module.exports = joi
  .object()
    .required()
    .keys(exports);
