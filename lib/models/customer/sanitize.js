/**
 * Trims name.
 *
 * @param {String} value
 * @return {String}
 */
exports.name = function(value) {
  return value
    .trim();
};

/**
 * Trims and lower cases email.
 *
 * @param {String} value
 * @return {String}
 */
exports.email = function(value) {
  return value
    .trim()
    .toLowerCase();
};

/**
 * Trims company.
 *
 * @param {String} value
 * @return {String}
 */
exports.company = function(value) {
  return value
    .trim();
};

/**
 * Reconstructs address with sanitized properties.
 *
 * @param {Object} value
 * @return {Object}
 */
exports.address = function(value) {
  return {
    zip: this.zip(value.zip),
    city: this.city(value.city),
    street: this.street(value.street)
  };
};

/**
 * Returns address zip untouched.
 *
 * @param {Number} value
 * @return {Number}
 */
exports.address.zip = function(value) {
  return value;
};

/**
 * Returns trimmed address city.
 *
 * @param {String} value
 * @return {String}
 */
exports.address.city = function(value) {
  return value
    .trim();
};

/**
 * Returns trimmed address street.
 *
 * @param {String} value
 * @return {String}
 */
exports.address.street = function(value) {
  return value
    .trim();
};
