var Mainmenu = function(game){}
 
MainMenu.prototype = {
  	create: function(){
		var title = this.game.add.sprite(160, 160, "title");
		title.anchor.setTo(0.5,0.5);
        
		var play_level1 = this.game.add.button(160, 320, "play", this.Level1, this);
		play_level1.anchor.setTo(0.5,0.5);
        
        var level = this.game.add.button(180, 320, "level", this.Levels, this);
		play_level2.anchor.setTo(0.5,0.5);
	},
    
	Level1: function(){
		this.game.state.start("Level1");
	},
    
    Levels: function(){
		this.game.state.start("Level2");
	}
}
