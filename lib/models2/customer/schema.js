var joi = require('joi');

var alpha    = /^[-\sa-zA-Z]+$/;
var alphanum = /^[\sa-zA-Z0-9]+$/i;

var id = joi
  .any();

var name = joi
  .string()
    .required()
    .min(5)
    .max(40)
    .regex(alpha);

var email = joi
  .string()
    .required()
    .min(6)
    .max(40)
    .email();

var company = joi
  .string()
    .optional()
    .min(3)
    .max(40)
    .regex(alphanum);

var address = joi
  .object()
    .required()
    .keys({
      street: joi
        .string()
          .optional()
          .min(5)
          .max(40),
      city: joi
        .string()
          .required()
          .min(3)
          .max(20)
          .regex(alphanum),
      zip: joi
        .number()
          .min(10000)
          .max(99999)
    });

module.exports = joi
  .object()
  .required()
  .options({
    stripUnknown: true
  })
  .keys({
    _id: id,
    name: name,
    email: email,
    company: company,
    address: address
  });
