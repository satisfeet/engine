var lodash = require('lodash');

exports.name = function(value) {
  return value
    .trim();
};

exports.email = function(value) {
  return value
    .trim()
    .toLowerCase();
};

exports.company = function(value) {
  return value
    .trim();
};

exports.address = function(value) {
  return {
    zip: this.zip(value.zip),
    city: this.city(value.city),
    street: this.street(value.street)
  };
};

exports.address.zip = function(value) {
  return value;
};

exports.address.city = function(value) {
  return value
    .trim();
};

exports.address.street = function(value) {
  return value
    .trim();
};
