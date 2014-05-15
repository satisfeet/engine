var gravatar = require('gravatar');

module.exports = function(app, schema) {

  schema.virtual('image').get(function() {
    return {
      url: generateUrl(this.email)
    };
  });

};

function generateUrl(email) {
  return gravatar.url(email, {
    d: 'retro'
  });
}