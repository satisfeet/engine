module.exports = function(schema) {

  schema.virtual('pricing.total').get(function() {
    var value = 0;

    this.articles.forEach(function(article) {
      value += article.quantity * article.price;
    });

    return value;
  });

};
