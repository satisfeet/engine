var template = require('../../templates/customers');

module.exports = function(app) {

  app('/customers', function(context, next) {
    context.element.innerHTML = template();
  });

};
