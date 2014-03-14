var squel = require('squel');

exports.create = function(connection, body, callback) {
  var query = squel.insert().into('customers');

  return connection.query(query.toString(), callback);
};

exports.findBy = function(connection, query, callback) {
  var query = squel.select().from('customers');

  return connection.query(query.toString(), callback);
};

exports.findOneBy = function(connection, query, callback) {
  var query = squel.select().from('customers');

  return connection.query(query.toString(), callback);
};
