var util   = require('util');
var squel  = require('squel');
var lodash = require('lodash');

function FilterBlock(options) {
  this._name = options.name;
  this._where = options.where;
  this._columns = options.columns;

  squel.cls.Block.apply(this, arguments);
}

util.inherits(FilterBlock, squel.cls.Block);

FilterBlock.prototype.filter = function(option) {
  if (!lodash.isPlainObject(option)) return;

  lodash.forEach(this._columns, function(column) {
    if (!option[column]) return;

    var value = '"%' + option[column] + '%"';

    this._where.where(this._name + '.' + column + ' LIKE ' + value);
  }, this);
};

module.exports = FilterBlock;
