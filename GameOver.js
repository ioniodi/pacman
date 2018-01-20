var GameOver = {
  
    create:function(){        

        var gmo = game.add.sprite(game.world.centerX, game.world.centerY, 'gmo');
        
        music = game.add.audio('DeathSound');
        music.volume = 0.2;
        music.play();
        
        gmo.anchor.setTo(0.5, 0.5);
        gmo.alpha = 0;

        game.add.tween(gmo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true,);
        
        button = game.add.button(200,360,'buttonRestart',this.actionOnClick,this,1,0,2);
        button.scale.setTo(0.7);
        
        button.alpha = 0;
        game.add.tween(button).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true,);
		
        
	},
	
	actionOnClick:function(){
        
		game.state.start('MainMenu');
        music.stop();
	},
    
};