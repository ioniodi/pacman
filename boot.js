var bootState = {
    
    
    preload:function(){
	//this.load.baseURL = 'https://Manolis-Tasiopoulos.github.io/pacman/';
    //this.load.crossOrigin = 'Manolis-Tasiopoulos';	
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