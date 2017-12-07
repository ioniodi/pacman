var MainMenuState = {
	create: function(){
        music = game.add.audio('themeMusic');
        music.volume = 0.2;
        music.play();
        
        
        
		backGround = game.add.sprite(0,0,'background');       
        backGround.alpha = 0;
        game.add.tween(backGround).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true,);
        
        button = game.add.button(300,160,'button',this.actionOnClick,this,1,0,2);
		button.scale.setTo(0.7);        
        button.alpha = 0;
        game.add.tween(button).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None, true,);
        
        buttonHelp = game.add.button(300,230,'buttonHelp',this.actionOnClickHelp,this,1,0,2);
		buttonHelp.scale.setTo(0.7);        
        buttonHelp.alpha = 0;
        game.add.tween(buttonHelp).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None, true,);
        
        
        
	},
	
	actionOnClick:function(){
        music.stop();
		game.state.start('Level1');
	},
    
    actionOnClickHelp:function(){        
		game.state.start('HelpScreen');
        
        
	},
};