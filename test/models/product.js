var url  = require('url');
var chai = require('chai');

var hooks = require('../hooks');

before(hooks.setup);

describe('Product', function() {

  describe('#get', function() {

    xit('should return variations', function() {
      var product = new this.Product({
        articles: [
          { variation: { color: 'red', size: 42 } },
          { variation: { color: 'blue', size: 42 } }
        ]
      });

      chai.expect(product)
        .to.have.property('variations')
        .to.have.property('color')
        .to.be.an('array')
        .to.contain('red')
        .to.contain('blue');
      chai.expect(product)
        .to.have.property('variations')
        .to.have.property('color')
        .to.be.an('array')
        .to.contain(42);
    });

  });

  describe('#set', function() {

    it('should sanitize title', function() {
      var product = new this.Product();

      product.title = ' Casual Socks ';

      chai.expect(product)
        .to.have.property('title')
        .to.equal('Casual Socks');
    });

    it('should sanitize pricing', function() {
      var product = new this.Product();

      product.pricing.retail = 2.001;

      chai.expect(product)
        .to.have.property('pricing')
        .to.have.property('retail')
        .to.equal(2.00);
    });

  });

  describe('#validate', function() {

    it('should return required errors', function(done) {
      var product = new this.Product();

      product.validate(function(err) {
        chai.expect(err).to.exist;

        chai.expect(err)
          .to.have.property('errors')
          .to.have.property('title')
          .to.have.property('type')
          .to.equal('required');

        chai.expect(err)
          .to.have.property('errors')
          .to.have.property('pricing.retail')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    it('should not return title error', function(done) {
      var product = new this.Product({ title: 'Alltags Socken' });

      product.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.not.have.property('title');

        done();
      });
    });

    it('should not return pricing error', function(done) {
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
