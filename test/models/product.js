var url  = require('url');
var chai = require('chai');

var hooks = require('../hooks');

before(hooks.setup);

describe('Product', function() {

  describe('#title', function() {

    it('should sanitize title', function() {
      var product = new this.Product();

      product.title = ' Casual Socks ';

      chai.expect(product)
        .to.have.property('title')
        .to.equal('Casual Socks');
    });

    it('should pass validation error', function(done) {
      var product = new this.Product();

      product.validate(function(err) {
        chai.expect(err)
          .to.exist
          .to.have.property('errors')
          .to.have.property('title')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    it('should not pass validation error', function(done) {
      var product = new this.Product({ title: 'Alltags Socken' });

      product.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.not.have.property('title');

        done();
      });
    });

  });

  describe('#pricing', function() {

    it('should sanitize pricing', function() {
      var product = new this.Product();

      product.pricing.retail = 2.001;

      chai.expect(product)
        .to.have.property('pricing')
        .to.have.property('retail')
        .to.equal(2.00);
    });

    it('should pass validation error', function(done) {
      var product = new this.Product();

      product.validate(function(err) {
        chai.expect(err).to.exist;

        chai.expect(err)
          .to.have.property('errors')
          .to.have.property('pricing.retail')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    it('should not pass validation error', function(done) {
      var product = new this.Product({ pricing: { retail: 2.99 } });

      product.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.not.have.property('pricing.retail');

        done();
      });
    });

  });

});
