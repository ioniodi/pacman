var bootState = {
    
    
    preload:function(){
	//this.load.baseURL = 'https://Dimitris-Stamatis.github.io/pacman/';
      //  this.load.crossOrigin = 'Dimitris-Stamatis';	
    },
    
	create:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

            this.physics.startSystem(Phaser.Physics.ARCADE);
       
		game.state.start('Preloader');
	},
};