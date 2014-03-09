var CustomerItem = require('./item');
var CustomerList = require('./list');
var CustomerForm = require('./form');

module.exports = function(app) {

  app('/customers/list', function(context, next) {
    var element = context.element;
    var customers = context.customers;

    while (element.firstElementChild) {
      element.firstElementChild.remove();
    }
    element.appendChild(new CustomerList(customers).element);
  });

  app('/customers/create', function(context, next) {
    var element = context.element;
    var customer = context.customer;

    while (element.firstElementChild) {
      element.firstElementChild.remove();
    }
    element.appendChild(new CustomerForm(customer).element);
  });

};
