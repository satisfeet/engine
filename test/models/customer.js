var url  = require('url');
var chai = require('chai');

var hooks = require('../hooks');

before(hooks.setup);

describe('Customer', function() {

  describe('#name', function() {

    it('should sanitize name', function() {
      var customer = new this.Customer();

      customer.name = ' bODO  Kaiser  ';

      chai.expect(customer)
        .to.have.property('name')
        .to.equal('Bodo Kaiser');
    });

    it('should validate required', function(done) {
      var customer = new this.Customer();

      customer.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.have.property('name')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    it('should not pass name error', function(done) {
      var customer = new this.Customer({ name: 'Hans Müller' });

      customer.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.not.have.property('name');

        done();
      });
    });

  });

  describe('#email', function() {

    it('should sanitize email', function() {
      var customer = new this.Customer();

      customer.email = '  i@bodo kaISER.Io ';

      chai.expect(customer)
        .to.have.property('email')
        .to.equal('i@bodokaiser.io');
    });

    it('should validate required', function(done) {
      var customer = new this.Customer();

      customer.validate(function(err) {
        chai.expect(err).to.exist;

        chai.expect(err)
          .to.have.property('errors')
          .to.have.property('email')
          .to.have.property('type')
          .to.equal('required');

        chai.expect(err)
          .to.have.property('errors')
          .to.have.property('address.city')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    it('should not pass email error', function(done) {
      var customer = new this.Customer({ email: 'i@bodokaiser.io' });

      customer.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.not.have.property('email');

        done();
      });
    });

  });

  describe('#image', function() {

    it('should build image of email', function() {
      var customer = new this.Customer({ email: 'i@bodokaiser.io' });

      chai.expect(customer)
        .to.have.property('image')
        .to.be.an('object')
        .to.have.property('url')
        .to.be.a('string');

      chai.expect(url.parse(customer.image.url))
        .to.have.property('host')
        .to.contain('gravatar.com');
    });

  });

  describe('#company', function() {

    it('should sanitize company', function() {
      var customer = new this.Customer();

      customer.company = '  Satisfeet GmbH';

      chai.expect(customer)
        .to.have.property('company')
        .to.equal('Satisfeet GmbH');
    });

    it('should not pass company error', function(done) {
      var customer = new this.Customer({ email: 'BlaBla Ltd.' });

      customer.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.not.have.property('company');

        done();
      });
    });

  });

  describe('#address', function() {

    it('should sanitize address', function() {
      var customer = new this.Customer();

      customer.address.street = ' ForstER sTraße 3';
      customer.address.city = ' BAD LAusitz ';

      chai.expect(customer)
        .to.have.property('address')
        .to.have.property('street')
        .to.equal('Forster Straße 3');
      chai.expect(customer)
        .to.have.property('address')
        .to.have.property('city')
        .to.equal('Bad Lausitz');
    });

    it('should validate required', function(done) {
      var customer = new this.Customer();

      customer.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.have.property('address.city')
          .to.have.property('type')
          .to.equal('required');

        done();
      });
    });

    it('should not pass address error', function(done) {
      var customer = new this.Customer({
        address: {
          street: '123 Street Avenue',
          city: 'Los Angelos',
          zip: 12111
        }
      });

      customer.validate(function(err) {
        chai.expect(err)
          .to.have.property('errors')
          .to.not.have.keys([
            'address.street',
            'address.city',
            'address.zip'
          ]);

        done();
      });
    });

  });

});
