var playState = {

   

 create: function () {
     this.score = 0;
        this.bonus=0;
        this.Scoretext;
        this.Livestext;
        this.Lives = 3;
        this.logob;
        this.Timetext;
        this.Bonustext;
        this.bonussound;
        this.dotssound;
        this.mkill;
        this.teleporttext;
        this.powerup;
        this.eatable= false;
        this.teleportcounter=3;
        this.key;
        this.counter1 = 0;
        this.music;
        this.map = null;
        this.layer = null;
        this.pacman = null;
        this.monster1=null;
        this.monster2=null;
        this.monster3=null;
        this.button;
        this.safetile = 107;
        this.gridsize = 16;
        this.speed = 150;
        this.threshold = 3;
        this.marker = new Phaser.Point();
        this.turnPoint = new Phaser.Point();
        this.directions = [ null, null, null, null, null ];
        this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];
        this.current = Phaser.NONE;
        this.turning = Phaser.NONE;
                        
            this.timer = this.game.time.create(false);
            this.timer1 = this.game.time.create(false);
            this.timer2 = this.game.time.create(false);
            
            this.buttontext = game.add.text((30 * 16),(14 * 16), 'Music', { fill: '#B22222' })
            this.button = this.add.button((31 * 16),(16 * 16), 'mbutton',this.mute, this, 1, 0, 2);
            //κειμενα και logo
            this.Scoretext = game.add.text((29 * 16),(2 * 16), 'Score: 0', { fill: '#B22222' });
            this.Livestext = game.add.text((29 * 16),(5 * 16), 'Lives: 3', { fill: '#B22222' });
            this.Timetext = game.add.text((29 * 16),(8 * 16), 'Time: 0', { fill: '#B22222' });
            this.Bonustext = game.add.text((29 * 16),(11 * 16), 'Bonus: 0', { fill: '#B22222' });
            this.teleporttext = game.add.text((1 * 16),(31 * 16), 'Teleports : 0 ', { fill: '#FFFFFF' });
            this.powerup = game.add.text((14 * 16),(31 * 16), 'Powerup time remaining : 0', { fill: '#FFFFFF' });
            
            this.key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.Teleport, this);
            
            this.logob = game.add.sprite((29 * 16),(21 * 16),'logo')
            
            //μουσικη και ηχοι
            this.music = this.add.audio('boden',0.2,true);
            this.music.play();
            this.bonussound = this.add.audio('bonus',0.8,true);
            this.dotssound = this.add.audio('dotsound',0.3,true);
            this.eatbonussound = this.add.audio('eatbonussound',0.3,true);
            this.mkill = this.add.audio('mkill',0.3,true);
            
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('pacman-tiles', 'tiles');
            this.layer = this.map.createLayer('Pacman');
            
            this.dots = this.add.physicsGroup();
            this.test = this.add.physicsGroup();
            this.eattest = this.add.physicsGroup();
            // "δηλωση" κουκιδων 
            this.map.createFromTiles(131, this.safetile, 'beer', this.layer, this.dots);
            this.map.createFromTiles(163, this.safetile, 'dot', this.layer, this.dots);
            this.map.createFromTiles(165,this.safetile, 'flower', this.layer, this.dots);
            this.map.createFromTiles(167,this.safetile, 'potion', this.layer,this.dots);
            
            //εντολες δημιουργιας τυχαιου μπλοκ και εντολες επαναληψης μουσικης 
            this.time.events.loop(10000, this.random, this);
            this.time.events.loop(20000, this.eatrandom, this);
            this.time.events.loop(15000,this.erase,this);
            this.time.events.loop(30000,this.eaterase,this);
            this.time.events.loop(100000,this.musicloop,this);
            this.time.events.loop(400,this.randomenemiesmoves1,this)
            this.time.events.loop(400,this.randomenemiesmoves2,this)
            this.time.events.loop(400,this.randomenemiesmoves3,this)  
            
            
            //  The dots will need to be offset by 6px to put them back in the middle of the grid
            this.dots.setAll('x', 4, false, false, 1);
            this.dots.setAll('y', 4, false, false, 1);
            //  Pacman should collide with everything except the safe tile
            this.map.setCollisionByExclusion([this.safetile], true, this.layer);
           
            //monsters/enemies
            this.monster1 = this.add.sprite((12 * 16), (24 * 16), 'monster', 0);
            this.physics.arcade.enable(this.monster1);
            this.monster1.body.setSize(12, 12, 0, 0);
            this.monster1.animations.add('flap', [1,2],true);
            this.monster1.play('flap');
            
            this.monster2 = this.add.sprite((15 * 16), (24 * 16), 'monster', 0);
            this.physics.arcade.enable(this.monster2);
            this.monster2.body.setSize(12, 12, 0, 0);
            this.monster2.animations.add('flap1', [1,2],true);
            this.monster2.play('flap1');
            
            this.monster3 = this.add.sprite((13.5 * 16), (10 * 16), 'monster', 0);
            this.physics.arcade.enable(this.monster3);
            this.monster3.body.setSize(13, 13, 0, 0);
            this.monster3.animations.add('flap2', [1,2],true);
            this.monster3.play('flap2');
            
            //  Position Pacman at grid location 14x17 (the +8 accounts for his anchor)
            this.pacman = this.add.sprite((14 * 16) + 8, (17 * 16) + 8, 'pacman', 0);
            this.pacman.anchor.set(0.5);
            this.pacman.animations.add('munch', [0, 1, 2, 1], 8, true);
            this.pacman.animations.add('dead', [3, 4, 5], 4, true);
            this.pacman.animations.add('angry',[6 , 7 , 8] , 8 , true);
            
            this.physics.arcade.enable(this.pacman);
            this.pacman.body.setSize(16, 16, 0, 0);
            this.cursors = this.input.keyboard.createCursorKeys();
            this.pacman.play('munch');
            this.move(Phaser.LEFT);
           
        },

        
        Teleport:function(){
        if (this.teleportcounter == 3){
        this.pacman.x =(10 * 16)+8;
        this.pacman.y= (18 * 16)+8;
        this.teleportcounter--;
      
        }
        else if (this.teleportcounter == 2){
        this.pacman.x = (20 * 16)+8;
        this.pacman.y= (18 * 16)+8; 
        this.teleportcounter--;
   
        }
        else if(this.teleportcounter == 1) {
        this.pacman.x =(15 * 16)+8;
        this.pacman.y= (18 * 16)+8;
        this.teleportcounter--;
  
        }
        },
        
        
        
        
        
        eatrandom:function(){
        this.eattest.create(this.rnd.between(5,400),this.rnd.between(250,300),'eatrandom');
         },
        eaterase: function(){
        this.eattest.callAll('kill');
        },
        eatkillrandom:function(pacman,rand)
        {
        rand.kill();
        this.eatbonussound.play();
        this.eatable = true ;
        this.pacman.play('angry');
        this.timer1.add(7000,this.eatend,this);
        this.timer1.start();
        
        
        },
        
        eatend:function(){
        this.eatable = false;    
        this.pacman.play('munch');
        this.timer1.destroy();
        },

        
        
        anim:function(){
        this.pacman.x=((14 * 16) + 8);
        this.pacman.y=((17 * 16) + 8);
        this.pacman.play('munch');
        this.timer.destroy();
        this.input.disabled = false;
            
        },
        mocol1:function(pacman,monster1){
        if(this.eatable==true){
        this.monster1.kill();
        this.mkill.play();
        }else if(this.Lives > 0){
        this.pacman.play('dead')
        this.lifelost();
        this.monster1.x= (12 * 16)
        this.monster1.y= (24 * 16)
        this.pacman.body.velocity.x = 0;
        this.pacman.body.velocity.y = 0;
        this.input.disabled = true;
        this.timer.add(2000,this.anim,this);
        this.timer.start();
        }else{
        this.game.pause= true;
        alert('GAME OVER \n press f5 to reload game');}
        },
        
        
        mocol2:function(pacman,monster2){
        if(this.eatable==true){
        this.monster2.kill();
        this.mkill.play();
        }else if(this.Lives > 0){
        this.pacman.play('dead')
        this.lifelost();
        this.monster2.x= (15 * 16);
        this.monster2.y= (24 * 16);
        this.pacman.body.velocity.x = 0;
        this.pacman.body.velocity.y = 0;
        this.input.disabled = true;
        this.timer.add(2000,this.anim,this);
        this.timer.start();
        }else{
        this.game.pause= true;
        alert('GAME OVER \n press f5 to reload game');}
        },
        
        mocol3:function(pacman,monster3){
        if(this.eatable==true){
        this.monster3.kill();
        this.mkill.play();
        }else if(this.Lives > 0){
        this.pacman.play('dead')
        this.lifelost();
        this.monster3.x= (13.5 * 16);
        this.monster3.y=  (10 * 16);
        this.pacman.body.velocity.x = 0;
        this.pacman.body.velocity.y = 0;
        this.input.disabled = true;
        this.timer.add(2000,this.anim,this);
        this.timer.start();
        }else{
        this.game.pause= true;
        alert('GAME OVER \n press f5 to reload game');}
        },
        
        
        
        randomenemiesmoves1:function(){
        var enspeed = 100;
        var rand = this.rnd.between(1,4)
        if (rand == 1){
        this.monster1.body.velocity.x = enspeed;
        this.monster1.body.velocity.y = null;
        }else if (rand == 2){
        this.monster1.body.velocity.x = -enspeed;
        this.monster1.body.velocity.y = null;    
        }else if (rand == 3){
        this.monster1.body.velocity.y = enspeed;
        this.monster1.body.velocity.x = null;
        }else{
        this.monster1.body.velocity.y = -enspeed;
        this.monster1.body.velocity.x = null;
        }
            
            
            
        },
         randomenemiesmoves2:function(){
        var enspeed = 100;
        var rand = this.rnd.between(1,4)
        if (rand == 1){
        this.monster2.body.velocity.x = enspeed;
        this.monster2.body.velocity.y = null;
        }else if (rand == 2){
        this.monster2.body.velocity.x = -enspeed;
        this.monster2.body.velocity.y = null;    
        }else if (rand == 3){
        this.monster2.body.velocity.y = enspeed;
        this.monster2.body.velocity.x = null;
        }else{
        this.monster2.body.velocity.y = -enspeed;
        this.monster2.body.velocity.x = null;
        }
            
            
            
        },
        
        randomenemiesmoves3:function(){
        var enspeed = 100;
        var rand = this.rnd.between(1,4)
        if (rand == 1){
        this.monster3.body.velocity.x = enspeed;
        this.monster3.body.velocity.y = null;
        }else if (rand == 2){
        this.monster3.body.velocity.x = -enspeed;
        this.monster3.body.velocity.y = null;    
        }else if (rand == 3){
        this.monster3.body.velocity.y = enspeed;
        this.monster3.body.velocity.x = null;
        }else{
        this.monster3.body.velocity.y = -enspeed;
        this.monster3.body.velocity.x = null;
        }
            
            
            
        },
        
        
        
        //συναρτηση 
        lifelost:function(){
        this.Lives--;
         this.Livestext.text = "Lives = " + this.Lives;
            
            
            
        },
        
        
        mute:function(){
        if(this.music.mute === false){
        this.button.setFrames(1, 2, 0);
        this.music.mute = true;    
         }else{
        this.button.setFrames(1, 0, 2);
        this.music.mute = false;
         }
            
        },
        
        // συναρτηση επαναληψης μουσικης
        musicloop:function(){
        if (this.music.mute === true){
        this.music = this.add.audio('boden',0.3,true);
        this.music.play();
        this.music.mute = true;   
         }else{
         this.music = this.add.audio('boden',0.3,true);
         this.music.play();
         }
        },
        
        //συναρτηση εξαφανισης τυχαιου dot
        erase: function(){
        this.test.callAll('kill');
        },
        
        
        //συναρτηση "συγκρουσης" χαρακηρα με το τυχαιο dot
        killrandom:function(pacman,random)
        {
        random.kill();
        this.bonussound.play();
        this.bbb=this.add.sprite(this.pacman.x,this.pacman.y,'bonusp');
        this.bbb.animations.add('bb', [0, 1, 2, 3,0,1,2,3],20,false);
        this.bbb.play('bb',5, false, true);
        this.bonus+=10;
        this.Bonustext.text = "Bonus: " + this.bonus +"points";
        },
        
        // συναρτηση δημιουργια τυχαιου dot
        random: function(){
        
         this.test.create(this.rnd.between(5,400),this.rnd.between(250,300),'random');
            
            },
        
        
        
            checkKeys: function () {
            if (this.cursors.left.isDown && this.current !== Phaser.LEFT)
            {
                this.checkDirection(Phaser.LEFT);
            }
            else if (this.cursors.right.isDown && this.current !== Phaser.RIGHT)
            {
                this.checkDirection(Phaser.RIGHT);
            }
            else if (this.cursors.up.isDown && this.current !== Phaser.UP)
            {
                this.checkDirection(Phaser.UP);
            }
            else if (this.cursors.down.isDown && this.current !== Phaser.DOWN)
            {
                this.checkDirection(Phaser.DOWN);
            }
            else
            {
                //  This forces them to hold the key down to turn the corner
                this.turning = Phaser.NONE;
            }
            },
            checkDirection: function (turnTo) {
            if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.safetile)
            {
                //  Invalid direction if they're already set to turn that way
                //  Or there is no tile there, or the tile isn't index 1 (a floor tile)
                return;
            }
            //  Check if they want to turn around and can
            if (this.current === this.opposites[turnTo])
            {
                this.move(turnTo);
            }
            else
            {
                this.turning = turnTo;
                this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
                this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2);
            }
        },
        
        
             turn: function () {
            var cx = Math.floor(this.pacman.x);
            var cy = Math.floor(this.pacman.y);
            //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
            if (!this.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold))
            {
                return false;
            }
            //  Grid align before turning
            this.pacman.x = this.turnPoint.x;
            this.pacman.y = this.turnPoint.y;
            this.pacman.body.reset(this.turnPoint.x, this.turnPoint.y);
            this.move(this.turning);
            this.turning = Phaser.NONE;
            return true;
        },
             move: function (direction) {
            var speed = this.speed;
            if (direction === Phaser.LEFT || direction === Phaser.UP)
            {
                speed = -speed;
            }
            if (direction === Phaser.LEFT || direction === Phaser.RIGHT)
            {
                this.pacman.body.velocity.x = speed;
            }
            else
            {
                this.pacman.body.velocity.y = speed;
            }
            //  Reset the scale and angle (Pacman is facing to the right in the sprite sheet)
            this.pacman.scale.x = 1;
            this.pacman.angle = 0;
            if (direction === Phaser.LEFT)
            {
                this.pacman.scale.x = -1;
            }
            else if (direction === Phaser.UP)
            {
                this.pacman.angle = 270;
            }
            else if (direction === Phaser.DOWN)
            {
                this.pacman.angle = 90;
            }
            this.current = direction;
            
        },
            
            eatDot: function (pacman, dot) {
          
            dot.kill();
            // εντολες για την πιο ομαλη λειτουργεια του ηχου του "φαγωματος" των dots
            this.counter1++;
            if (this.counter1 === 6)
            {
                this.counter1  = 0 ;
                this.dotssound.play();
            }
           
            
                
            if (this.dots.total === 0)
            {
                this.dots.callAll('revive');
                
            }
            this.score++;
            this.Scoretext.text = "Score: " + this.score +"points";
        },
        
        
        update: function () { 
            this.powerup.text = "Powerup remaining: " + (Math.round(this.timer1.duration.toFixed(0)*0.01)) + "secs";
            this.teleporttext.text = "Teleports: "+ this.teleportcounter;
            
            
            this.physics.arcade.collide(this.monster1, this.layer);
            this.physics.arcade.collide(this.monster2, this.layer);
            this.physics.arcade.collide(this.monster3, this.layer);
            this.physics.arcade.collide(this.pacman, this.layer);
            
            this.physics.arcade.overlap(this.pacman, this.monster1, this.mocol1, null, this);
            this.physics.arcade.overlap(this.pacman, this.monster2, this.mocol2, null, this);
            this.physics.arcade.overlap(this.pacman, this.monster3, this.mocol3, null, this);
            
            this.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this);
            this.physics.arcade.overlap(this.pacman, this.test, this.killrandom, null, this);
            this.physics.arcade.overlap(this.pacman, this.eattest, this.eatkillrandom, null, this);
            
            // χρονος
            this.Timetext.text="Time:"+ Math.round(game.time.now*0.001)+"sec";
            this.marker.x = this.math.snapToFloor(Math.floor(this.pacman.x), this.gridsize) / this.gridsize;
            this.marker.y = this.math.snapToFloor(Math.floor(this.pacman.y), this.gridsize) / this.gridsize;
            //  Update our grid sensors
            this.directions[1] = this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y);
            this.directions[2] = this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y);
            this.directions[3] = this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y);
            this.directions[4] = this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y);
            this.checkKeys();
            if (this.turning !== Phaser.NONE)
            {
                this.turn();
            }
        }
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
};