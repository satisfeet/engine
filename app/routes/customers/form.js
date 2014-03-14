var domify = require('domify');

var template = require('../../views/customers/form');

function Form(model) {
  this.element = domify(template({
    customer: model.toJSON()
  }));
}

module.exports = Form;
