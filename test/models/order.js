var chai     = require('chai');
var mongoose = require('mongoose');

var hooks = require('../hooks');

before(hooks.setup);

describe('Order', function() {

  describe('#customer', function() {

    it('should pass "required" error', function(done) {
      var order = new this.Order();

      order.validate(function(err) {
        chai.expect(err)
          .to.be.instanceOf(Error)
          .to.have.property('errors')
          .to.have.property('customer')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    it('should pass "custom" error', function(done) {
      var order = new this.Order({
        customer: new this.Customer()
      });

      order.validate(function(err) {
        chai.expect(err)
          .to.be.instanceOf(Error)
          .to.have.property('errors')
          .to.have.property('customer')
          .to.have.property('type')
          .to.equal('user defined');

        done();
      });
    });

  });

  describe('#state', function() {

    it('should return created', function() {
      var order = new this.Order();

      chai.expect(order)
        .to.have.property('state')
        .to.have.property('created')
        .to.be.a('Date');
    });

  });

  describe('#pricing', function() {

    it('should return total', function() {
      var order = new this.Order({
        items: [
          { price: 2.50, quantity: 1 },
          { price: 2.50, quantity: 3 }
        ]
      });

      chai.expect(order)
        .to.have.property('pricing')
        .to.have.property('total')
        .to.equal(10.00);
    });

  });

  describe('#items', function() {

    before(hooks.customer.create);

    it('should return "required" errors', function(done) {
      var order = new this.Order({
        customer: this.customer.id,
        items: [{}]
      });

      order.validate(function(err) {
        chai.expect(err)
          .to.be.an.instanceOf(Error)
          .to.have.property('errors')
          .to.have.property('items.0.price')
          .to.have.property('type')
          .to.equal('required');
        chai.expect(err)
          .to.be.an.instanceOf(Error)
          .to.have.property('errors')
          .to.have.property('items.0.quantity')
          .to.have.property('type')
          .to.equal('required');
        chai.expect(err)
          .to.be.an.instanceOf(Error)
          .to.have.property('errors')
          .to.have.property('items.0.product')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    after(hooks.customer.remove);

  });

});
