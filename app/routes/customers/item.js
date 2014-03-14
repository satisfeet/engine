var domify = require('domify');

var template = require('../../views/customers/item');

function Item(model) {
  this.element = domify(template({
    customer: model.toJSON()
  }));
}

module.exports = Item;
