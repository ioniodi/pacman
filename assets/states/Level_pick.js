var Level_pick = function (game) {}

Level_pick.prototype = {
  	create: function(){
    	console.log('%cLevel_pick -> create intitialized', 'color:white; background:red');
      	var Title = this.game.add.sprite(160, 160, 'title');
      	Title.anchor.setTo(0.5, 0.5);
      	var play = this.game.add.button(100, 320, 'play', this.Level2, this);
		play.anchor.setTo(0.5, 0.5);
	},
	
  Level2: function () {
		this.game.state.start('Level2');
	}
}
