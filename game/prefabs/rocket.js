'use strict';

var Rocket = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'rocket', frame);
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('jets');

  this.name = 'rocket';

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = true;


  // controls
  this.body.velocity.x = 0;

};

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.update = function() {

  // write your prefab's specific update code here

};
Rocket.prototype.jets = function() {

};

module.exports = Rocket;
