exports.name = function(value) {
  return capitalizeAll(value).trim();
};

exports.email = function(value) {
  return value.trim().toLowerCase();
};

exports.company = function(value) {
  if (!value) return;

  return value.trim();
};

exports.address = function(value) {
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
