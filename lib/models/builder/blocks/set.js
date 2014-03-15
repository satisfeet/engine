var util   = require('util');
var squel  = require('squel');
var lodash = require('lodash');

function SetBlock(options) {
  this.name    = options.name;
  this.columns = options.columns;

  this.block = new squel.cls.SetFieldBlock(options);

  squel.cls.Block.apply(this, arguments);
}

util.inherits(SetBlock, squel.cls.Block);

SetBlock.prototype.set = function(key, value) {
  var self = this;

  if (lodash.isPlainObject(key)) {
    lodash.forIn(key, function(value, key) {
      if (self.columns.indexOf(key) === -1) return;

      self.set(key, value);
    });
  }
  if (lodash.isString(key)) {
    this.block.set(key, value || null);
  }
};

SetBlock.prototype.buildStr = function() {
  return this.block.buildStr();
};

SetBlock.prototype.buildParam = function() {
  return this.block.buildParam();
};

module.exports = SetBlock;
