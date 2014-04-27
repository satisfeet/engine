var joi = require('joi');

exports.name = joi
  .string()
    .required()
    .max(30)
    .alphanum();

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
    .alphanum();

exports.address = joi
  .object()
    .optional()
    .keys();

exports.address.street = joi
  .string()
    .required()
    .min(5)
    .alphanum();

exports.address.city = joi
  .string()
    .required()
    .min(4)
    .alphanum();

exports.address.zip = joi
  .number()
    .required()
    .min(10000)
    .max(99999);

module.exports = joi
  .object()
    .required()
    .keys(exports);
