var MainMenu = function (game) {}

MainMenu.prototype = {
  	create: function(){
		console.log('%cMainMenu -> create intitialized', 'color:white; background:red');
		var Title = this.game.add.sprite(this.world.centerX, this.world.centerY-100, 'title');
		Title.anchor.setTo(0.5, 0.5);

		var play = this.game.add.button(this.world.centerX, this.world.centerY, 'play', this.Level1, this);
		play.anchor.setTo(0.5, 0.5);

		var level2 = this.game.add.button(this.world.centerX, this.world.centerY + 55, 'level2', this.Level2, this);
		level2.anchor.setTo(0.5, 0.5);
	},
	Level1: function () {
		this.game.state.start('Level2');
	},

	level2: function () {
		this.game.state.start('Level2');
	}
}
