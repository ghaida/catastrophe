(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(640, 480, Phaser.AUTO, 'catastrophe');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],5:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],6:[function(require,module,exports){

'use strict';
function Menu() {}
var Cat = require('../prefabs/cat');

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.background = this.game.add.sprite(0,0, 'background');
    this.cat = new Cat(this.game, this.game.width/2, 420);
    this.game.add.existing(this.cat);

    this.playButton = this.game.add.button(this.game.width/2, 280, 'playButton', this.startClick, this);
    this.playButton.anchor.setTo(0.5,0.5);
  },
  startClick: function() {
    this.game.state.start('play');
  },

  update: function() {
  }
};

module.exports = Menu;

},{"../prefabs/cat":2}],7:[function(require,module,exports){

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

},{"../prefabs/cat":2,"../prefabs/land":3}],8:[function(require,module,exports){

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

},{}]},{},[1])