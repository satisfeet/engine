var joi = require('joi');

var schema = joi
  .object()
    .required()
    .keys();

schema.name = joi
  .string()
    .required()
    .min(5)
    .max(40)
    .alphanum();

schema.email = joi
  .string()
    .required()
    .min(6)
    .max(40)
    .email();

schema.company = joi
  .string()
    .optional()
    .min(3)
    .max(40)
    .alphanum();

schema.address = joi
  .object()
    .required()
    .keys();

schema.address.street = joi
  .string()
    .optional()
    .min(5)
    .max(40)
    .alphanum();

schema.address.city = joi
  .string()
    .required()
    .min(2)
    .max(20)
    .alphanum();

schema.address.zip = joi
  .number()
    .required()
    .min(10000)
    .max(99999);

module.exports = schema;
