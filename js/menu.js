var menuState = {
    create : function() {
        
    this.theme = this.add.audio('livetheme',0.2,true);
    this.theme.play();
    var gamename = game.add.text(100,100,'PACMAN',{font: '50px arial',fill:'#ffffff'});
    this.BACKGROUND = game.add.image(20,20,'Background');
    this.BACKGROUND.width = 700; 
    this.BACKGROUND.height = 480;
    this.startbutton = this.add.button(250,70, 'startbut',this.start,this,1,0);
    this.levelbutton = this.add.button(250,170, 'levelsbut',this.start,this,1,0);
    this.helpbutton = this.add.button(250,270, 'helpbut',this.help,this,1,0);
    this.aboutbutton = this.add.button(250,370, 'aboutbut',this.about,this,1,0);
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
    about:function(){
    this.theme.destroy();
    game.state.start('about');  
    },
    help:function(){
    this.theme.destroy();
    game.state.start('help');  
    },
    start:function (){
        this.theme.destroy();
        game.state.start('play');
    },
    
    
    
    
    
    
    
    
    
    
    

};