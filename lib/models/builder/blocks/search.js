var util   = require('util');
var squel  = require('squel');
var lodash = require('lodash');

function SearchBlock(options) {
  this._name = options.name;
  this._where = options.where;
  this._columns = options.columns;

  squel.cls.Block.apply(this, arguments);
}

util.inherits(SearchBlock, squel.cls.Block);

SearchBlock.prototype.search = function(option) {
  if (!lodash.isString(option)) return;

  var expr = squel.expr();

  lodash.forEach(this._columns, function(column) {
    expr.or(this._name + '.' + column + ' LIKE "%' + option + '%"');
  }, this);

  this._where.where(expr);
};

module.exports = SearchBlock;
