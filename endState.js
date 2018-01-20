var finish = {
  
    create:function(){        

        var ending = game.add.sprite(game.world.centerX, game.world.centerY, 'end');
        
        music = game.add.audio('endSound');
        music.volume = 0.4;
        music.play();
        
        ending.anchor.setTo(0.5, 0.5);
        ending.alpha = 0;

        game.add.tween(ending).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);        
          
	},
	
    
};