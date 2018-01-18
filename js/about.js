var aboutState = {
    create : function() {
    //this.BACKGROUND2 = game.add.image(20,20,'Background');
    //this.BACKGROUND2.width = 700; 
    //this.BACKGROUND2.height = 480;
    var helptitle = game.add.text(280,5,'ABOUT',{font: '50px arial',fill:'#FF0000'});
    var helptext = game.add.text(100,100,'        MADE FOR A\n UNIVERSITY PROJECT\n               2017',{font: '50px arial',fill:'#FF0000'});
    
    this.backbutton = this.add.button(250,420, 'backbut',this.goback,this,1,0);
    },
    
    goback:function(){
    game.state.start('menu');    
        
        
        
    },
    
    
    
    
    
    
    
};