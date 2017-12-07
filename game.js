var game = new Phaser.Game(550, 520, Phaser.AUTO);


game.state.add('boot',bootState);
game.state.add('Preloader',Preloader);
game.state.add('MainMenu',MainMenuState);
game.state.add('Level1',Pacman);
game.state.add('GameOver',GameOver);
game.state.add('HelpScreen',HelpScreen);
game.state.start('boot');