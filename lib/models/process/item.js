var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

var Article  = mongoose.models.Article;

var schema = new Schema({
  article: {
    ref: 'Article',
    type: ObjectId
  },
  price: Number,
  quantity: Number
});

/**
 * Article which the item wraps.
 *
 * @type {Array}
 */
schema.path('article')
  .required()
  .validate(function(value, done) {
    Article.count({ _id: value }, function(err, result) {
      if (err) throw err;

      done(!!result);
    });
  })

/**
 * Final price of an article.
 *
 * @type {Number}
 */
schema.path('price')
  .required()
  .min(0)
  .steps(0.01)

/**
 * Quantity of the article.
 *
 * @type {Number}
 */
schema.path('quantity')
    .required()
    .min(0)
    .steps(1)

module.exports = schema;
