var domify = require('domify');

var template = require('../../templates/customers/form');

function Form(model) {
  this.element = domify(template({
    customer: model.toJSON()
  }));
}

module.exports = Form;
