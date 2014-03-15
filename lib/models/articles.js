var Builder = require('./builder');

var articles = new Builder('articles', [
  'id',
  'name',
  'vat',
  'price',
  'categories_id'
]);

var categories = new Builder('categories', [
  'id',
  'name'
]);

exports.select = function(options) {
  var query = articles.createSelectQuery();

  query.join('categories');
  query.where('articles.categories_id = categories.id');

  query.field('articles.id', 'id');
  query.field('articles.name', 'name');
  query.field('articles.vat', 'vat');
  query.field('articles.price', 'price');
  query.field('categories.name', 'category');

  query.search(options.search);
  query.filter(options.filter);
  query.limit(options.limit);

  return query.toString();
};

exports.insert = function(options) {

};

exports.update = function(options) {

};

exports.destroy = function(options) {

};
