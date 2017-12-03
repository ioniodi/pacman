var Boot = function(game) {
	console.log('%cPacman - geocfu', 'color:white; background:red');
};

Boot.prototype = {
	preload: function() {
          this.game.load.image('loading','assets/loading.png');
	},
  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.setScreenSize();
		console.log('%cBoot -> create intitialized', 'color:white; background:red');
		this.game.state.start('Preload');
	}
}
