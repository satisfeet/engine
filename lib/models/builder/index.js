var squel  = require('squel');
var lodash = require('lodash');

var SelectQuery = require('./queries/select');
var InsertQuery = require('./queries/insert');
var UpdateQuery = require('./queries/update');
var DeleteQuery = require('./queries/delete');

function Builder(name, columns) {
  this.name = name;
  this.columns = columns;
}

Builder.prototype.createSelectQuery = function() {
  return new SelectQuery(this).from(this.name);
};

Builder.prototype.createInsertQuery = function() {
  return new InsertQuery(this).into(this.name);
};

Builder.prototype.createUpdateQuery = function() {
  return new UpdateQuery(this).table(this.name);
};

Builder.prototype.createDeleteQuery = function() {
  return new DeleteQuery(this).from(this.name);
};

module.exports = Builder;
