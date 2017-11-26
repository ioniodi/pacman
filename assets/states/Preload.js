var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
		this.game.load.image("title","assets/states/buttons/title.png");
		this.game.load.image("title","assets/states/buttons/play.png");
		this.game.load.image("title","assets/states/buttons/level.png");
	},
  	create: function(){
		this.game.state.start("MainMenu");
	}
}
