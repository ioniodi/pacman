var GameMenu = function () {};

GameMenu.prototype = {
  preload: function () {
  },

  create: function () {
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);
  },
  
  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Game Title", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
  },
};
