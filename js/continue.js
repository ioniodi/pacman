var continueState = {
    create : function() {
    this.BACKGROUND2 = game.add.image((20),(20),'Background');
    this.BACKGROUND2.width = 700; 
    this.BACKGROUND2.height = 480;
    this.BACKGROUND3 = game.add.image((17*16),(12*16),'level2im');
    this.BACKGROUND3.width = 200; 
    this.BACKGROUND3.height = 100;
    var helptext = game.add.text(100,100,'',{font: '50px arial',fill:'#0000CC'});

    this.backbutton = this.add.button(250,420, 'continuebut',this.goback,this,1,0);
    },
    
    goback:function(){
    game.state.start('play2');    
        
        
        
    },
    
    
    
    
    
    
    
};