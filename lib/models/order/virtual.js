module.exports = function(app, schema) {

  schema.virtual('pricing.total').get(function() {
    var value = 0;

    this.products.forEach(function(product) {
      value += product.quantity * product.price;
    });

    return value;
  });

};
