
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
