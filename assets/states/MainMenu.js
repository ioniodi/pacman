var MainMenu = function (game) {}

MainMenu.prototype = {
  	create: function () {
		console.log('%cMainMenu -> create intitialized', 'color:white; background:red');
		var Title = this.game.add.sprite(this.world.centerX, this.world.centerY-100, 'title');
		Title.anchor.setTo(0.5, 0.5);

		var play = this.add.button(this.world.centerX, this.world.centerY, 'play',
            function () {
                this.game.state.start('Level1');
            }
        );
		play.anchor.setTo(0.5, 0.5);

		var level2 = this.add.button(this.world.centerX, this.world.centerY + 55, 'level2',
            function () {
                this.game.state.start('Level2');
            }
        );
		level2.anchor.setTo(0.5, 0.5);

	}
};
