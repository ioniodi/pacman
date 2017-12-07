var helpState = {
    create : function() {
    this.BACKGROUND1 = game.add.image(20,20,'Background');
    this.BACKGROUND1.width = 700; 
    this.BACKGROUND1.height = 480;
    var helptitle = game.add.text(280,5,'HELP',{font: '50px arial',fill:'#FF0000'});
    var helptext = game.add.text(100,60,'Use cursor keys to move\nYou have three lives\nYou have three teleports\nUse space to teleport\nGather red diamonds to\n         eat monsters',{font: '50px arial',fill:'#FF0000'});
    
    this.backbutton = this.add.button(250,420, 'backbut',this.goback,this,1,0);
    },
    
    goback:function(){
    game.state.start('menu');    
        
        
        
    },
    
    
    
    
    
    
    
};