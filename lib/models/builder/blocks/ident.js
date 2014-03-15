var util   = require('util');
var squel  = require('squel');
var lodash = require('lodash');

function IdentBlock(options) {
  this._name = options.name;
  this._where = options.where;
  this._columns = options.columns;

  squel.cls.Block.apply(this, arguments);
}

util.inherits(IdentBlock, squel.cls.Block);

IdentBlock.prototype.ident = function(option) {
  if (!option) return;

  this._where.where(this._name + '.id = ?', option);
};

module.exports = IdentBlock;
