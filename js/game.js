var game = new Phaser.Game(750, 530, Phaser.CANVAS,'gameDiv');
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('help',helpState);
game.state.add('about',aboutState);
game.state.add('play',playState);





game.state.start('boot');