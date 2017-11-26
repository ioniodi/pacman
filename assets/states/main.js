var game = new Phaser.Game(448, 496, Phaser.AUTO);
 
Preload.prototype = {
    preload: function(){ 
        this.game.load.image('title','assets/states/buttons/title.png');
        this.game.load.image('play','assets/states/buttons/play.png');
        this.game.load.image('level','assets/states/buttons/level.png');
    },
    
    create: function(){
        console.log('Preload goes to MainMenu');
        this.game.state.start('MainMenu');
    }
}
