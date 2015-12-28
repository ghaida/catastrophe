'use strict';

var Cat = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cat', frame);
  this.anchor.setTo(0.5, 0.5);

  this.animations.add('walkLeft', [4, 3, 2, 1, 0], 12, true);
  this.animations.add('walkRight', [6, 7, 8, 9, 10], 12, true);

  this.name = 'cat';
  this.enableBody = true;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.body.collideWorldBounds = true;

  this.body.gravity.y = 4000;
  this.body.bounce.y = 0.2;

  // controls
  this.body.velocity.x = 0;
  this.frame = 5;

};

Cat.prototype = Object.create(Phaser.Sprite.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.update = function() {

  // write your prefab's specific update code here

};
Cat.prototype.walk = function() {

};

module.exports = Cat;
