var domify = require('domify');

var template = require('../../templates/customers/list');

var Item = require('./item');

function List(collection) {
  this.element = domify(template({
    customers: collection.toJSON()
  }));

  listenToPushEvent(this.element, collection, this);
}

List.prototype.push = function(model) {
  this.element.querySelector('tbody').appendChild(new Item(model).element);

  return this;
};

module.exports = List;

function listenToPushEvent(element, collection, view) {
  collection.on('push', function(model) {
    view.push(model);
  });
}
