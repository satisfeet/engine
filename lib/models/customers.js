var mysql = require('mysql');
var squel = require('squel');

module.exports = function(app, db) {

  app.customers = {
    find: function(options, callback) {
      var query = squel.select().from('customers');

      if (arguments.length === 1) {
        callback = options;
        options = {};
      }

      if (options.order) {
        query.order(options.order);
      }

      db.query(query.toString(), callback);
    },
    create: function(document, callback) {
      prepare(document);

      db.query('INSERT INTO customers SET ?', document, callback);
    }
  };

};

function prepare(document) {
  if (!document.company) {
    document.company = null;
  }
}
