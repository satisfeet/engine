var mysql = require('mysql');

module.exports = function(app, db) {

  app.customers = {
    find: function(query, callback) {
      if (Object.keys(query).length > 0) {
        return this.findBy(query, callback);
      }

      db.query('SELECT * FROM customers', callback);
    },
    findBy: function(query, callback) {
      db.query('SELECT * FROM customers WHERE ?', query, callback);
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
