var loadState = {

    
    
    preload:function(){
        
                  //  We need this because the assets are on github pages
            //  Remove the next 2 lines if running locally
            //this.load.baseURL = 'https://p15theo2.github.io/pacman/';
            //this.load.crossOrigin = 'anonymous';

            this.load.spritesheet('mbutton', 'assets/musicsprites.png',50,40,3);
            this.load.spritesheet('startbut', 'assets/startbut.png',249,113);
            this.load.spritesheet('levelsbut', 'assets/levelsbut.png',249,113);
            this.load.spritesheet('helpbut', 'assets/helpbut.png',249,113);
            this.load.spritesheet('aboutbut', 'assets/aboutbut.png',249,113);
            this.load.spritesheet('backbut', 'assets/backbut.png',249,113);
            this.load.audio('boden','assets/tetris.mp3');
            this.load.audio('livetheme','assets/livetheme.mp3');
            this.load.audio('bonus','assets/bonussound.wav');
            this.load.audio('dotsound','assets/dotsound.wav');
            this.load.audio('eatbonussound','assets/eatbonussound.wav')
            this.load.audio('mkill','assets/monsterkill.wav')
            this.load.image('dot', 'assets/dot.png');
            this.load.image('logo', 'assets/logo.png');
            this.load.image('tiles', 'assets/pacman-tiles.png');
            this.load.image('potion', 'assets/potiontile.png');
            this.load.image('random', 'assets/randomtile.png');
            this.load.image('eatrandom', 'assets/eatbonus.png');
            this.load.image('bonusp', 'assets/bonuspop.png');
            this.load.image('beer', 'assets/beer.png');
            this.load.image('flower', 'assets/flowerdot.png');
            this.load.image('Background','assets/backgroundim.png')
            this.load.spritesheet('pacman', 'assets/pacman.png', 32, 32);
            this.load.spritesheet('monster', 'assets/monster.png',23,21);
            this.load.spritesheet('bonusp', 'assets/bonuspop.png', 95,30,3);
            this.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);
            //LOADING 
            //  Needless to say, graphics (C)opyright Namco
        
        
        
        
    },
    create:function(){

    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    


    game.state.start('menu');
    }
    
    
    
    
    
    
    
    
    
    
    

};