var util   = require('util');
var squel  = require('squel');
var lodash = require('lodash');

function WhereBlock(options) {
  options.where = this.block = new squel.cls.WhereBlock(options);

  squel.cls.Block.apply(this, arguments);
}

util.inherits(WhereBlock, squel.cls.Block);

WhereBlock.prototype.where = function() {
  this.block.where.apply(this.block, arguments);
};

WhereBlock.prototype.buildStr = function() {
  return this.block.buildStr();
};

WhereBlock.prototype.buildParam = function() {
  return this.block.buildParam();
};

module.exports = WhereBlock;
