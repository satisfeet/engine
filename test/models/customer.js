var co       = require('co');
var chai     = require('chai');
var lodash   = require('lodash');
var gravatar = require('gravatar');

var hooks = require('../hooks');

before(hooks.setup);

describe('Customer', function() {

  beforeEach(hooks.customers.create);

  describe('#find([params])', function() {

    it('should return array of Customer', co(function*() {
      var result = yield this.Customer.find();

      chai.expect(result)
        .to.be.an('array')
        .have.length(1);

      chai.expect(result[0])
        .to.be.instanceof(this.Customer);
      chai.expect(result[0].toObject())
        .to.eql(this.customer);
    }));

    it('should return array of Customer by "search"', co(function*() {
      var result1 = yield this.Customer.find({ search: 'foobar' });
      var result2 = yield this.Customer.find({ search: 'aise' });

      chai.expect(result1)
        .to.be.an('array')
        .to.be.empty;

      chai.expect(result2)
        .to.be.an('array')
        .to.have.length(1);

      chai.expect(result2[0])
        .to.be.instanceof(this.Customer);
      chai.expect(result2[0].toObject())
        .to.eql(this.customer);
    }));

    it('should return array of Customer by "filter"', co(function*() {
      var result1 = yield this.Customer.find({ filter: { name: 'Freeman' } });
      var result2 = yield this.Customer.find({ filter: { name: 'Kaiser' } });

      chai.expect(result1)
        .to.be.an('array')
        .to.be.empty;

      chai.expect(result2)
        .to.be.an('array')
        .to.have.length(1);

      chai.expect(result2[0])
        .to.be.instanceof(this.Customer);
      chai.expect(result2[0].toObject())
        .to.eql(this.customer);
    }));

  });

  describe('#findOne(params)', function() {

    it('should return null', co(function*() {
      var result = yield this.Customer.findOne({ id: '1234' });

      chai.expect(result).to.be.null;
    }));

    it('should return Customer by "id"', co(function*() {
      var result = yield this.Customer.findOne({
        id: this.customer._id
      });

      chai.expect(result)
        .to.be.instanceof(this.Customer);
      chai.expect(result.toObject())
        .to.eql(this.customer);
    }));

  });

  describe('#insert(object)', function() {

    it('should return Customer', co(function*() {
      var result = yield this.Customer.insert({
        name: 'Bobby Bob',
        email: 'bobby@gmail.com',
        address: {
          city: 'Sydney'
        }
      });

      chai.expect(result)
        .to.be.instanceof(this.Customer)
        .to.have.property('id');
    }));

  });

  describe('#update(model)', function() {

    it('should update Customer', co(function*() {
      var customer = new this.Customer(this.customer);

      customer.name += ' Junior';

      yield this.Customer.update(customer);

      var result = yield this.db.get('customers').findOne({
        _id: customer.id
      });

      chai.expect(result).to.not.be.null;
    }));

  });

  describe('#remove(model)', function() {

    it('should remove customer', co(function*() {
      var customer = new this.Customer(this.customer);

      yield this.Customer.remove(this.customer);

      var result = yield this.db.get('customers').findOne({
        _id: this.customer.id
      });

      chai.expect(result).to.be.null;
    }));

  });

  describe('#validate(model)', function() {

    it('should throw ValidationError', function() {
      var self = this;

      chai.expect(function() {
	self.Customer.validate({
	  name: 'Bodo Kaiser',
	  email: 'i@bodokaiser.io'
	});
      }).to.throw();
      chai.expect(function() {
	self.Customer.validate({
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
	self.Customer.validate({
	  name: 'Bodo Kaiser',
	  email: 'i@bodokaiser.io',
	  address: {
	    city: 'Berlin'
	  }
	});
      }).to.not.throw();
    });

  });

  afterEach(hooks.customers.remove);

});

describe('Customer.prototype', function() {

  before(hooks.customers.create);

  describe('#id', function() {

    it('should get "_id" as string', function() {
      var customer = new this.Customer(this.customer);

      chai.expect(customer)
        .to.have.property('id')
        .to.equal(this.customer._id.toString());
    });

  });

  describe('#name', function() {

    it('should get "name"', function() {
      var customer = new this.Customer(this.customer);

      chai.expect(customer)
        .to.have.property('name')
        .to.equal(this.customer.name);
    });

    it('should set "name"', function() {
      var customer = new this.Customer(this.customer);

      customer.name = 'Bo Kaiser';

      chai.expect(customer)
        .to.have.property('attributes')
        .to.have.property('name')
        .to.equal('Bo Kaiser');
    });

  });

  describe('#image', function() {

    it('should get "image"', function() {
      var customer = new this.Customer(this.customer);

      var url = gravatar.url(customer.email, {
        default: 'mm',
        size: '500'
      });

      chai.expect(customer)
        .to.have.property('image')
        .to.eql({ url: url });
    });

  });

  describe('#company', function() {

    it('should get "company"', function() {
      var customer = new this.Customer(this.customer);

      chai.expect(customer)
        .to.have.property('company')
        .to.equal(this.customer.company);
    });

    it('should set "company"', function() {
      var customer = new this.Customer(this.customer);

      customer.company = 'Satisfeet UG';

      chai.expect(customer)
        .to.have.property('attributes')
        .to.have.property('company')
        .to.equal('Satisfeet UG');
    });

  });

  describe('#address', function() {

    it('should get "address"', function() {
      var customer = new this.Customer(this.customer);

      chai.expect(customer)
        .to.have.property('address')
        .to.equal(this.customer.address);
    });

    it('should set "address"', function() {
      var customer = new this.Customer(this.customer);

      customer.address.street = 'Mehringdamm 12';

      chai.expect(customer)
        .to.have.property('attributes')
        .to.have.property('address')
        .to.have.property('street')
        .to.equal('Mehringdamm 12');
    });

  });

  describe('#toObject()', function() {

    it('should return object "attributes"', function() {
      var customer = new this.Customer(this.customer);

      chai.expect(customer.toObject())
        .to.have.keys('_id', 'name', 'email', 'company', 'address');
    });

  });

  describe('#toJSON()', function() {

    it('should return json "attributes"', function() {
      var customer = new this.Customer(this.customer);

      chai.expect(customer.toJSON())
        .to.have.keys('id', 'image', 'name', 'email', 'company', 'address')
        .to.have.property('id')
        .to.equal(this.customer._id.toString());
    });

  });

  after(hooks.customers.remove);

});
