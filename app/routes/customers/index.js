var CustomerItem = require('./item');
var CustomerList = require('./list');

module.exports = function(app) {

  app('/customers', function(context, next) {
    var element = context.element;
    var collection = context.customers;

    while (element.firstElementChild) {
      element.firstElementChild.remove();
    }

    element.appendChild(new CustomerList(collection).element);
  });

};
