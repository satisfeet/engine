/**
 * Calculates total price of all items.
 *
 * @return {Number}
 */
exports.calculateTotal = function() {
  return this.items.reduce(function(previous, current) {
    return previous + current.quantity * current.price;
  }, 0);
};
