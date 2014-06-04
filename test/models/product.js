var co       = require('co');
var chai     = require('chai');
var lodash   = require('lodash');
var gravatar = require('gravatar');

var hooks = require('../hooks');

before(hooks.setup);

xdescribe('Product', function() {

  beforeEach(hooks.products.create);

  describe('#find([params])', function() {

    it('should return array of Product', co(function*() {
      var result = yield this.Product.find();

      chai.expect(result)
        .to.be.an('array')
        .have.length(1);

      chai.expect(result[0])
        .to.be.instanceof(this.Product);
      chai.expect(result[0].toObject())
        .to.eql(this.product);
    }));

  });

  describe('#findOne(params)', function() {

    it('should return null', co(function*() {
      var result = yield this.Product.findOne({ id: '1234' });

      chai.expect(result).to.be.null;
    }));

    it('should return Product by "id"', co(function*() {
      var result = yield this.Product.findOne({
        id: this.product._id
      });

      chai.expect(result)
        .to.be.instanceof(this.Product);
      chai.expect(result.toObject())
        .to.eql(this.product);
    }));

  });

  describe('#validate(model)', function() {

    it('should throw ValidationError', function() {
      var self = this;

      chai.expect(function() {
	self.Product.validate({
	  name: 'Bodo Kaiser',
	  email: 'i@bodokaiser.io'
	});
      }).to.throw();
      chai.expect(function() {
	self.Product.validate({
	  name: 'Bodo Kaiser',
	  email: 'i@bodokaiser.',
	  address: {
	    city: 'Berlin'
	  }
	});
      }).to.throw();
    });

    it('should not throw ValidationError', function() {
      var self = this;

      chai.expect(function() {
	self.Product.validate({
	  name: 'Bodo Kaiser',
	  email: 'i@bodokaiser.io',
	  address: {
	    city: 'Berlin'
	  }
	});
      }).to.not.throw();
    });

  });

  afterEach(hooks.products.remove);

});

describe('Product.prototype', function() {

  before(hooks.products.create);

  describe('#id', function() {

    it('should return null', function() {
      var product = new this.Product();

      chai.expect(product)
        .to.have.property('id')
        .to.be.null;
    });

    it('should return _id as string', function() {
      var product = new this.Product(this.product);

      chai.expect(product)
        .to.have.property('id')
        .to.equal(this.product._id.toString());
    });

  });

  describe('#title', function() {

    it('should return title', function() {
      var product = new this.Product(this.product);

      chai.expect(product)
        .to.have.property('title')
        .to.equal(this.product.title);
    });

    it('should set title to trimmed', function() {
      var product = new this.Product();

      product.title = ' Foo Bar  ';

      chai.expect(product)
        .to.have.property('title')
        .to.equal('Foo Bar');
    });

  });

  describe('#details', function() {

    it('should return details', function() {
      var product = new this.Product(this.product);

      chai.expect(product)
        .to.have.property('details')
        .to.equal(this.product.details);
    });

  });

  describe('#pricing', function() {

    it('should return pricing', function() {
      var product = new this.Product(this.product);

      chai.expect(product)
        .to.have.property('pricing')
        .to.equal(this.product.pricing);
    });

    it('should set pricing to fixed', function() {
      var product = new this.Product();

      product.pricing.retail = 2.009;

      chai.expect(product)
        .to.have.property('pricing')
        .to.have.property('retail')
        .to.equal(2.01);
    });

  });

  after(hooks.products.remove);

});
