var Level_pick = function (game) {}

Level_pick.prototype = {
  	create: function(){
      console.log('%cLevel_pick -> create intitialized', 'color:white; background:red');
      var Title = this.game.add.sprite(160, 160, 'title');
      Title.anchor.setTo(0.5, 0.5);
      var level2 = this.game.add.button(200, 300, 'level', this.Level2, this);
      level2.anchor.setTo(0.5, 0.5);
	},
	
  Level2: function () {
		this.game.state.start('Level2');
	}
}
