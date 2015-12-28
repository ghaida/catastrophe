'use strict';

var Land = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'land');

  this.game.physics.arcade.enableBody(this);
  this.physicsType = Phaser.SPRITE;

  this.autoScroll(-200, 0);

  this.body.allowGravity = false;

  this.body.immovable = true;

};

Land.prototype = Object.create(Phaser.TileSprite.prototype);
Land.prototype.constructor = Land;

Land.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Land;
