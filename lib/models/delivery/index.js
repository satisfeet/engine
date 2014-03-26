var mongoose = require('mongoose');

module.exports = function(app) {

  var schema = new mongoose.Schema({
    state: {
      created: Date,
      shipped: Date,
      cleared: Date
    },
    pricing: {
      terms: Object,
      total: Number
    },
    supplier: {
      ref: 'Supplier',
      type: mongoose.Schema.ObjectId
    },
    materials: [
      {
        material: {
          ref: 'Material',
          type: mongoose.Schema.ObjectId
        },
        quantity: Number,
        price: Number
      }
    ]
  });

  mongoose.model('Delivery', schema);

};
