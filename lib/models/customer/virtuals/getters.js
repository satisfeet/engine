var gravatar = require('gravatar');

/**
 * Returns gravatar image object.
 *
 * @return {Object}
 */
exports.image = function() {
  var url = gravatar.url(this.email, {
    default: 'mm',
    size: 500
  });

  return { url: url };
};
