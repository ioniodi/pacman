var levelsState = {
    create : function() {
        
    this.theme = this.add.audio('livetheme',0.2,true);
    this.theme.play();
    var gamename = game.add.text(100,100,'PACMAN',{font: '50px arial',fill:'#ffffff'});
    this.BACKGROUND = game.add.image(20,20,'Background');
    this.BACKGROUND.width = 700; 
    this.BACKGROUND.height = 480;
    
    this.sel1 = this.add.button(250,100, 'level1im',this.level1,this,1,0);
    this.sel2 = this.add.button(250,200, 'level2im',this.level2,this,1,0);
    this.backbutton = this.add.button(250,420, 'backbut',this.goback,this,1,0);

        
    this.buttontext = game.add.text(645,400, 'Music', { fill: '#B22222' })
    this.mutebutton = this.add.button(660,440, 'mbutton',this.mute, this, 1, 0, 2);


        
    
    
     },
    
    mute:function(){
    if(this.theme.mute == false){
    this.mutebutton.setFrames(1, 2, 0);
    this.theme.mute = true;    
    }else{
    this.mutebutton.setFrames(1, 0, 2);
    this.theme.mute = false;
    }
    },

    level1:function (){
    this.theme.destroy();
    game.state.start('play');
    },
      level2:function (){
    this.theme.destroy();
    game.state.start('play2');
    },
     goback:function(){
    this.theme.destroy();
    game.state.start('menu');    
        
        
        
    },
    
    
    
    
    
    
    
    
    
    
    

};