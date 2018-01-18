var gameoverState = {
    create : function() {
    this.BACKGROUND2 = game.add.image((20),(20),'Background');
    this.BACKGROUND2.width = 700; 
    this.BACKGROUND2.height = 480;

    this.backbutton = this.add.button(250,420, 'gameoverim',this.goback,this,1,0);
    },
    
    goback:function(){
    game.state.start('menu');    
        
        
        
    },
    
    
    
    
    
    
    
};