var LevelChange = {
  
    create:function(){        

        var ohno = game.add.sprite(game.world.centerX, game.world.centerY, 'ohno');
        var stole = game.add.sprite(game.world.centerX, game.world.centerY, 'stole');
        var before = game.add.sprite(game.world.centerX, game.world.centerY, 'before');
        
        music = game.add.audio('talk');
        music.volume = 0.2;
        music.play();
        
        ohno.anchor.setTo(0.5, 0.5);
        ohno.alpha = 0;
        
        stole.anchor.setTo(0.5, 0.5);
        stole.alpha = 0;
        
        before.anchor.setTo(0.5, 0.5);
        before.alpha = 0;
        
        game.add.tween(ohno).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        
        this.time.events.loop(5000,this.fadePicture1,this,stole,ohno);
        this.time.events.loop(10000,this.fadePicture2,this,before,stole);
        this.time.events.loop(15000,this.nextLevel,this);
        
        
        
	},
    
    fadePicture1: function(stole,ohno) {

        game.add.tween(ohno).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(stole).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
    },
    
    fadePicture2: function(before,stole) {
        game.add.tween(stole).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(before).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);          
    },   
    
    nextLevel: function(){
        music.stop();
        game.state.start('Level2');        
    }
    
};