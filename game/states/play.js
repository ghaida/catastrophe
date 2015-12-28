
'use strict';
var Cat = require('../prefabs/cat');
var Land = require('../prefabs/land');

function Play() {}

Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.physics.arcade.gravity.y = 1200;

    this.sky = this.game.add.tileSprite(0,0, 640, 408, 'sky');
    this.cat = new Cat(this.game, 100, this.game.height/2);
    this.game.add.existing(this.cat);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    this.fireKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.land = new Land(this.game, 0, 408, 640, 72);
    this.game.add.existing(this.land);
  },
  update: function() {
    this.game.physics.arcade.collide(this.cat, this.land);

    if (this.cursors.left.isDown) {
      //  Move to the left
      this.cat.body.velocity.x = -72;
      this.cat.animations.play('walkLeft',12, true);
      this.land.autoScroll(72, 0);

    }
    else if (this.cursors.right.isDown) {
      //  Move to the right
      this.cat.body.velocity.x = 72;
      this.cat.animations.play('walkRight',12, true);
      this.land.autoScroll(-72, 0);

    }
    else {
      this.cat.body.velocity.x = 0;
      this.cat.body.velocity.y = 0;
      this.cat.animations.stop();
      this.land.autoScroll(0,0);
      this.cat.frame = 5;
    }
  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
