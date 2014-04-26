var lodash = require('lodash');

module.exports = function* sanitize(next) {
  this.body.name = name(this.body.name);
  this.body.email = email(this.body.email);
  this.body.company = company(this.body.company);
  this.body.address = address(this.body.address);

  yield next;
};

function name(value) {
  return capitalizeAll(value).trim();
};

function email(value) {
  return value.trim().toLowerCase();
};

function company(value) {
  if (!value) return;

  return value.trim();
};

function address(value) {
  if (!value) return;

  return {
    street: capitalize(value.street.trim()),
    city: value.street.trim().split(' ').map(capitalize).join(' '),
    zip: value.zip
  };
};

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function capitalizeAll(value) {
  return value.split(' ').map(capitalize).join(' ');
}
