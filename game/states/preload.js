
'use strict';

var platforms;
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    this.load.bitmapFont('gameFont', 'assets/munro.ttf');

    this.load.image('background', 'assets/bg.png');
    this.load.image('playButton', 'assets/btn-play.png', 200, 44);
    this.load.spritesheet('cat', 'assets/cat.png', 44, 40);
    this.load.image('land', 'assets/land.png');
    this.load.spritesheet('sky', 'assets/sky.png', 44, 408);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
