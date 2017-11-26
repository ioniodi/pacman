var Preload = function (game) {}

Preload.prototype = {
	preload: function() { 
        var loadingBar = this.add.sprite(160, 240, 'loading');
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.image('title', 'assets/states/buttons/title.png');
	    this.game.load.image('play', 'assets/states/buttons/play.png');
	    this.game.load.image('level', 'assets/states/buttons/level.png');
	},
  	create: function(){
        console.log('%cPreload -> create intitialized', 'color:white; background:red');
		this.game.state.start('MainMenu');
	}
}
