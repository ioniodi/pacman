var HelpScreen = {
  
    create:function(){        

        var help = game.add.sprite(game.world.centerX, game.world.centerY, 'helpScreen');              
        help.anchor.setTo(0.5, 0.5);
        help.alpha = 0;
        game.add.tween(help).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true,);
        
                
        button = game.add.button(300,160,'buttonBack',this.actionOnClick,this,1,0,2);
		button.scale.setTo(0.7);        
        button.alpha = 0;
        game.add.tween(button).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None, true,);
		
        
	},
	
	actionOnClick:function(){
        
		game.state.start('MainMenu');
        music.stop();
	},
    
};