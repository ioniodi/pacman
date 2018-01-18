var game = new Phaser.Game(750, 530, Phaser.CANVAS,'gameDiv');
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('help',helpState);
game.state.add('about',aboutState);
game.state.add('play',playState);
game.state.add('play2',play2State);
game.state.add('levels',levelsState);
game.state.add('gameover',gameoverState);
game.state.add('continue',continueState);





game.state.start('boot');