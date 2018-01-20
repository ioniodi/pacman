var music;
    var score = 0;    
    var time = 0; 
    var Bonus = 0;
    var timeNow = 0;  
    var prevTime = 0;
        
    var Level2 = function (game) {

        this.map = null;
        this.layer = null;
        this.pacman = null;

        this.safetile = 1;
        this.gridsize = 16;
        
        this.livesCount = 4;
        this.livesTimer = true;
        this.potionTimer = true;
        this.enemyTimer = true;
        this.enemy2Timer = true;

        this.speed = 150;
        this.threshold = 3;

        this.marker = new Phaser.Point();
        this.turnPoint = new Phaser.Point();

        this.directions = [ null, null, null, null, null ];
        this.enemyDirection = [0, 0, 0, 0];       
        this.curEnemyDirection;
        
        this.enemyDirection1 = [0, 0, 0, 0];       
        this.curEnemyDirection1;
        
        this.enemyCanDie = false;
        this.enemy2CanDie = false;
        
        this.takeWeaponOneTime = true;
        this.takeTeleportOneTime = true;
        
        this.teleportCount = 0;
        this.swordsCount = 2;  
        
        this.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

        this.current = Phaser.NONE;
        this.turning = Phaser.NONE;

    };

        
        
    Level2.prototype = {

        init: function () {

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;

            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

            this.physics.startSystem(Phaser.Physics.ARCADE);

        },

            
        
        create: function () {
            
            
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.map = this.add.tilemap('map2');
            this.map.addTilesetImage('pacman-tiles', 'tiles2');
            
            this.logo = game.add.sprite(0, 0, 'logo');
            this.logo.scale.setTo(0.2,0.2);
            
            music = game.add.audio('pacman-music2');
            music.volume = 0.5;
            music.play();
            this.layer = this.map.createLayer('Pacman');

            this.dots = this.add.physicsGroup();
            this.bonus = this.add.physicsGroup();
            this.weapon = this.add.physicsGroup();
            this.teleport = this.add.physicsGroup();
            
            this.time.events.loop(5000,this.select_bonus_spot,this);
            this.time.events.loop(2500,this.changeEnemyDir,this);
            this.time.events.loop(2500,this.changeEnemyDir1,this);
            this.time.events.loop(10000,this.hideBonus,this);
            this.time.events.loop(161000,this.playMusic,this);
            
            /*-----Add New Dots-----------------*/
            this.map.createFromTiles(995, this.safetile, 'dot', this.layer, this.dots);
            this.map.createFromTiles(996, this.safetile, 'dot1', this.layer, this.dots);
            this.map.createFromTiles(993, this.safetile, 'dot2', this.layer, this.dots);
            this.map.createFromTiles(963, this.safetile, 'dot3', this.layer, this.dots);
            this.map.createFromTiles(929, this.safetile, 'dot4', this.layer, this.dots);
        
                
                        
            /*-----Add Texts and images for the time,score,bonus and lives--------------------*/
            this.text = game.add.text(0, 497, 'Score: 0', {fill: '#ca010c'});
            this.time = game.add.text(137, 497, '', {fill: '#ca010c'});
            this.apples = game.add.text(225, 497, 'Bonus: 0', {fill: '#f9f613'});
            this.lives = game.add.text(330, 497, 'Lives: ', {fill: '#ca010c'});
            this.potionsText = game.add.text(500, 110, ': 0' , {fill: '#ffffff'});
            this.swordText = game.add.text(500, 175, ': 2' , {fill: '#ffffff'});
            
            this.timer = game.add.sprite(110, 497, 'timer');
            this.timer.scale.setTo(0.6,0.6);
            
            this.heart1 = game.add.sprite(386, 501.5, 'heart');
            this.heart1.scale.setTo(0.6,0.6);
            
            this.heart2 = game.add.sprite(405, 501.5, 'heart');
            this.heart2.scale.setTo(0.6,0.6);
            
            this.heart3 = game.add.sprite(424, 501.5, 'heart');
            this.heart3.scale.setTo(0.6,0.6);
            
            this.potion = game.add.sprite(440, 101.5, 'teleport-potion');
            this.potion.scale.setTo(3,3);
            
            this.sword = game.add.sprite(440, 150.5, 'weapon');
            this.sword.scale.setTo(2,2);
            
            this.text.font = 'assets/font';
            this.text.fontSize = 20;
            this.text.fontWeight = 'bold'
            
            this.time.font = 'assets/font';
            this.time.fontSize = 20;
            this.time.fontWeight = 'bold'
            
            this.apples.font = 'assets/font';
            this.apples.fontSize = 20;
            this.apples.fontWeight = 'bold'
            
            this.lives.font = 'assets/font';
            this.lives.fontSize = 20;
            this.lives.fontWeight = 'bold'
            
            this.potionsText.font = 'assets/font';
            this.potionsText.fontSize = 27;
            this.potionsText.fontWeight = 'bold'
            
            this.swordText.font = 'assets/font';
            this.swordText.fontSize = 27;
            this.swordText.fontWeight = 'bold'
            
            //  The dots will need to be offset by 6px to put them back in the middle of the grid
            this.dots.setAll('x', 2, false, false, 1);
            this.dots.setAll('y', 2, false, false, 1);            
            

            //  Pacman should collide with everything except the safe tile
            this.map.setCollisionByExclusion([this.safetile], true, this.layer);

            //  Position Pacman at grid location 14x17 (the +8 accounts for his anchor)
            this.pacman = this.add.sprite((14 * 16) + 8, (19 * 16) + 8, 'pacman', 0);
            this.pacman.anchor.set(0.5);
            this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);

            this.physics.arcade.enable(this.pacman);
            this.pacman.body.setSize(15, 15, 0, 0);
            
            
            
            this.enemy = this.add.sprite((14 * 16) + 8, (14 * 16) + 8, 'enemy', 0);
            this.enemy.anchor.set(0.5);
            this.physics.arcade.enable(this.enemy);
            this.enemy.body.setSize(15, 15, 0, 0);
            this.enemyDirection [3] = 1;
            this.enemy.animations.add('enm', [0, 1, 2, 3, 3, 2, 1, 0], 15, true);
            this.enemy.play('enm');
            this.curEnemyDirection = 3;
            
            
            this.enemy2 = this.add.sprite((12 * 16) + 8, (14 * 16) + 8, 'enemy', 0);
            this.enemy2.anchor.set(0.5);
            this.physics.arcade.enable(this.enemy2);
            this.enemy2.body.setSize(15, 15, 0, 0);
            this.enemyDirection1 [3] = 1;
            this.enemy2.animations.add('enm1', [0, 1, 2, 3, 3, 2, 1, 0], 15, true);
            this.enemy2.play('enm1');
            this.curEnemyDirection1 = 3;
            
            
            
            
            this.cursors = this.input.keyboard.createCursorKeys();

            this.pacman.play('munch');
            this.move(Phaser.LEFT);
            this.enemyMove();
            this.enemyMove1();
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
        
        teleportPacman: function(){
            this.pacman.kill();
            this.potionsText.text = ': ' + this.teleportCount;
            this.pacman_spot = game.rnd.integerInRange(1, 5);  //Random choose where bonus will spawn
            
            
            
            switch (this.pacman_spot)
            {
                    case 1:             
                        this.pacman = this.add.sprite((12 * 16) + 5, (28 * 16) + 5, 'pacman', 0);
                        this.pacman.anchor.set(0.5);
                        this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);
                        console.log("1");
                        if(this.enemyCanDie == true)
                        {                            
                            this.pacman.loadTexture('link-sword',0);
                        }
                        this.physics.arcade.enable(this.pacman);
                        this.pacman.body.setSize(15, 15, 0, 0);
                        this.move(Phaser.RIGHT);
                    break;
                    
                    case 2:               
                        this.pacman = this.add.sprite((13 * 16) + 8, (14 * 16) + 8, 'pacman', 0);
                        this.pacman.anchor.set(0.5);
                        this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);
                        console.log("2");
                        if(this.enemyCanDie == true)                        {
                            
                            this.pacman.loadTexture('link-sword',0);
                        }
                        this.physics.arcade.enable(this.pacman);
                        this.pacman.body.setSize(15, 15, 0, 0);
                        this.move(Phaser.UP);
                    break;
                    
                    case 3:                                                            //5 spot for bonus to spawn               
                        this.pacman = this.add.sprite((3 * 16) + 8, (1 * 16) + 8, 'pacman', 0);
                        this.pacman.anchor.set(0.5);
                        this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);
                        console.log("3");
                        if(this.enemyCanDie == true)
                        {                            
                            this.pacman.loadTexture('link-sword',0);
                        }
                        this.physics.arcade.enable(this.pacman);
                        this.pacman.body.setSize(15, 15, 0, 0);
                        this.move(Phaser.RIGHT);
                    break;
                    
                    case 4:                        
                        this.pacman = this.add.sprite((10 * 16) + 8, (26 * 16) + 8, 'pacman', 0);
                        this.pacman.anchor.set(0.5);
                        this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);
                        console.log("3");
                        if(this.enemyCanDie == true)
                        {                            
                            this.pacman.loadTexture('link-sword',0);
                        }
                        this.physics.arcade.enable(this.pacman);
                        this.pacman.body.setSize(15, 15, 0, 0);
                        this.move(Phaser.LEFT);
                    break;
                    
                    case 5:            
                        this.pacman = this.add.sprite((20 * 16) + 8, (13 * 16) + 8, 'pacman', 0);
                        this.pacman.anchor.set(0.5);
                        this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);
                        console.log("4");
                        if(this.enemyCanDie == true)
                        {                            
                            this.pacman.loadTexture('link-sword',0);
                        }
                        this.physics.arcade.enable(this.pacman);
                        this.pacman.body.setSize(15, 15, 0, 0);
                        this.move(Phaser.LEFT);
                    break;                   
                    
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
                this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);
                this.pacman.play('munch');
                this.pacman.scale.x = -1;
            }
            else if (direction === Phaser.UP)
            {
               
                this.pacman.animations.add('munch', [3, 4, 5, 4, 3], 15, true);
                this.pacman.play('munch');
            }
            else if (direction === Phaser.DOWN)
            {
                this.pacman.animations.add('munch', [8, 9, 8, 7,6], 15, true);
                this.pacman.play('munch');
            }
            else if (direction === Phaser.RIGHT)
            {
                this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);
                this.pacman.play('munch');
            }

            this.current = direction;

        },
        
        
        changeEnemyDir: function(){
            
            if(this.enemy.x == 13 && this.enemy.y >= 15 )
            {
               
                this.enemyDirection [3] = 1;
                this.curEnemyDirection = 3;
                this.enemyMove();                
                return;
            }
            
            if(this.enemy.x == (3 * 16) + 8 && this.enemy.y >= (28 * 16) + 8 )
            {
                this.enemyDirection [3] = 1;
                this.curEnemyDirection = 3;
                this.enemyMove();                
                return;
            }
            
            if(this.enemy.x <= (5 * 16) + 8 && this.enemy.y == (27 * 16) + 8 )
            {
                this.enemyDirection [0] = 1;
                this.curEnemyDirection = 0;
                this.enemyMove();                
                return;
            }
            
            for(i = 0;i < 4;i++)
            {
                if(i == this.curEnemyDirection)
                {
                    this.enemyDirection[this.curEnemyDirection] = 0;
                }
                    
                this.enemyDirection[i] = 1;
            }
            
            this.enemyMove();
        },
        
         changeEnemyDir1: function(){           
            
            if(this.enemy2.x == 13 && this.enemy2.y >= 15 )
            {
                
                this.enemyDirection1 [3] = 1;
                this.curEnemyDirection1 = 3;
                this.enemyMove();                
                return;
            }
            
            if(this.enemy2.x == (3 * 16) + 8 && this.enemy2.y >= (28 * 16) + 8 )
            {
                this.enemyDirection1 [3] = 1;
                this.curEnemyDirection1 = 3;
                this.enemyMove();                
                return;
            }
            
            if(this.enemy2.x <= (5 * 16) + 8 && this.enemy2.y == (27 * 16) + 8 )
            {
                this.enemyDirection1 [0] = 1;
                this.curEnemyDirection1 = 0;
                this.enemyMove();                
                return;
            }
            
            for(i = 0;i < 4;i++)
            {
                if(i == this.curEnemyDirection1)
                {
                    this.enemyDirection1[this.curEnemyDirection1] = 0;
                }
                    
                this.enemyDirection1[i] = 1;
            }
            
            
            this.enemyMove1();
        },
        
        checkEnemyColision: function () {
          
            if(this.physics.arcade.overlap(this.enemy, this.layer))
            {                                   
                this.changeEnemyDir();
            }   
            
            if(this.physics.arcade.overlap(this.enemy2, this.layer))
            {                                   
                this.changeEnemyDir1();
            }   
            
        },          
        
        
        enemyMove: function () {
            
            var speed = this.speed - 52;           
             
            this.enemy.scale.x = 1;
            this.enemy.angle = 0;
            
            
            
            for(;;)
            {
                this.randEnemyMovment = game.rnd.integerInRange(0, 3);
                
                if(this.enemyDirection[this.randEnemyMovment] == 1)
                {
                    this.curEnemyDirection = this.randEnemyMovment;
                    break;
                }                   
            }
            
            
                
                    
            if(this.curEnemyDirection == 0)
            {
                this.enemy.animations.add('enm', [4, 5, 6, 7,7, 6, 5, 4], 15, true);
                this.enemy.scale.x = -1;
                this.enemy.play('enm');
                
                
                this.enemy.body.velocity.x = -speed;
                this.curEnemyDirection = 0;                
                this.enemyDirection[this.curEnemyDirection] = 1;
                return;
            }
            if(this.curEnemyDirection == 1)
            {
                this.enemy.animations.add('enm', [4, 5, 6, 7,7, 6, 5, 4], 15, true);
                this.enemy.play('enm');
                
                this.enemy.body.velocity.x = speed;
                this.curEnemyDirection = 1;
                this.enemyDirection[this.curEnemyDirection] = 1;      
                return;
            } 
            if(this.curEnemyDirection == 2)
            {
                this.enemy.animations.add('enm', [8, 9, 10, 11, 11, 10, 9, 8], 15, true);
                this.enemy.play('enm');                
                
                this.enemy.body.velocity.y = speed;
                this.curEnemyDirection = 2;
                this.enemyDirection[this.curEnemyDirection] = 1; 
                return;
            }  
            if(this.curEnemyDirection == 3)
            {
                this.enemy.animations.add('enm', [0, 1, 2, 3, 3, 2, 1, 0], 15, true);
                this.enemy.play('enm');   
                
                this.enemy.body.velocity.y = -speed;
                this.curEnemyDirection = 3;
                this.enemyDirection[this.curEnemyDirection] = 1;  
                return;
            }  
            
            
        },
        
        enemyMove1: function () {
            
            var speed = this.speed - 52;           
             
            this.enemy2.scale.x = 1;
            this.enemy2.angle = 0;
            
            
            for(;;)
            {
                this.randEnemyMovment1 = game.rnd.integerInRange(0, 3);
                
                if(this.enemyDirection1[this.randEnemyMovment1] == 1)
                {
                    this.curEnemyDirection1 = this.randEnemyMovment1;
                    break;
                }                   
            }
            
            
            
            if(this.curEnemyDirection1 == 0)
            {
                this.enemy2.animations.add('enm1', [4, 5, 6, 7,7, 6, 5, 4], 15, true);
                this.enemy2.scale.x = -1;
                this.enemy2.play('enm1');
                
                
                this.enemy2.body.velocity.x = -speed;
                this.curEnemyDirection1= 0;                
                this.enemyDirection1[this.curEnemyDirection1] = 1;
                return;
            }
            if(this.curEnemyDirection1 == 1)
            {
                this.enemy2.animations.add('enm1', [4, 5, 6, 7,7, 6, 5, 4], 15, true);
                this.enemy2.play('enm1');
                
                this.enemy2.body.velocity.x = speed;
                this.curEnemyDirection1 = 1;
                this.enemyDirection1[this.curEnemyDirection1] = 1;      
                return;
            } 
            if(this.curEnemyDirection1 == 2)
            {
                this.enemy2.animations.add('enm1', [8, 9, 10, 11, 11, 10, 9, 8], 15, true);
                this.enemy2.play('enm1');                
                
                this.enemy2.body.velocity.y = speed;
                this.curEnemyDirection1 = 2;
                this.enemyDirection1[this.curEnemyDirection1] = 1; 
                return;
            }  
            if(this.curEnemyDirection1 == 3)
            {
                this.enemy2.animations.add('enm1', [0, 1, 2, 3, 3, 2, 1, 0], 15, true);
                this.enemy2.play('enm1');   
                
                this.enemy2.body.velocity.y = -speed;
                this.curEnemyDirection1 = 3;
                this.enemyDirection1[this.curEnemyDirection1] = 1;  
                return;
            }  
        },
        

        eatDot: function (pacman, dot) {
            
            dot.kill();
            score++;
            this.text.text = "Score: " + score;

            if ( this.dots.total === 0 )      
            {               
                music.stop();
                game.state.start('endState');
                
                pacman.kill();                                     
                this.pacman = this.add.sprite((14 * 16) + 8, (19 * 16) + 8, 'pacman', 0);
                this.pacman.anchor.set(0.5);                                                   //Delete character and respawn him at the center again
                this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);

                this.physics.arcade.enable(this.pacman);
                this.pacman.body.setSize(15, 15, 0, 0);

                this.cursors = this.input.keyboard.createCursorKeys();

                this.pacman.play('munch');
                this.move(Phaser.LEFT);
                
                score = 0;
                Bonus = 0;
                                
                this.text.text = "Score: 0";
                this.apples.text = "Bonus: 0";                
                
                this.dots.callAll('revive');
            }
            
            

        },        
                        
        hideBonus: function(){
            this.bonus.callAll('kill');              //Function for delete previous bonus sprite
        },
        
        bonusTextKill : function(bonusText){
        
            bonusText.kill();
        
        },
        
        eatBonus: function (pacman, bonus) {
            bonus.kill();                                   //kill bonus sprite
            
            b_sound = game.add.audio('bonus_sound');        //play a sound when you eat bonus apple
            b_sound.volume = 1;
            b_sound.play();
            
            
            this.bonusText = this.add.sprite(this.pacman.x, this.pacman.y, 'bonusText');    
            this.bonusText.anchor.set(0.5);                                                 //Show a message when you eat bonus
            this.physics.arcade.enable(this.bonusText);           
            
            
            this.bonusText.body.velocity.y = -150;
            this.timer = game.time.events.loop(5000,this.bonusTextKill,this,this.bonusText);
            
            Bonus += 50;                                                      //Every bonus you eat gives you 50 points
            this.apples.text = "Bonus: " + Bonus;
            
        },
        
        
        
        select_bonus_spot: function(){                     //Function for choosing where the bonus will spawn
            this.bonus_spot = game.rnd.integerInRange(1, 5);  //Random choose where bonus will spawn
            
            switch (this.bonus_spot)
            {
                    case 1:
                        this.bonus.create((12 * 16) + 5, (28 * 16) + 5, 'bonus');
                    break;
                    
                    case 2:
                        this.bonus.create((13 * 16) + 5, (14 * 16) + 5, 'bonus');
                    break;
                    
                    case 3:                                                            //5 spot for bonus to spawn
                        this.bonus.create((3 * 16) + 5, (0 * 16) + 5, 'bonus');
                    break;
                    
                    case 4:
                        this.bonus.create((1 * 16) + 5, (26 * 16) + 5, 'bonus');
                    break;
                    
                    case 5:
                        this.bonus.create((20 * 16) + 5, (13 * 16) + 5, 'bonus');
                    break;                   
                    
            }
        },
        
        playMusic: function (){
          music.play();
        },
        
        
        enemyKillPlayer: function() {
            
            
            
            this.pacman.body.velocity.x = 0;
            this.pacman.body.velocity.y = 0;
            
            if (this.current === Phaser.LEFT)
            {
                this.pacman.loadTexture('death-right-left',0);                
                this.pacman.scale.x = -1;
            }
            else if (this.current === Phaser.UP)
            {               
                this.pacman.loadTexture('death-up',0);
            }
            else if (this.current === Phaser.DOWN)
            {
                this.pacman.loadTexture('death-down',0);
            }
            else if (this.current === Phaser.RIGHT)
            {
                this.pacman.loadTexture('death-right-left',0);
            }
            
            if(this.enemyTimer == true)
                {            

                    this.timerEnemy = this.game.time.create(false);
                    this.timerEnemy.add(2000,this.setEnemyTrue,this);
                    this.timerEnemy.start();
                    
                    hit_sound = game.add.audio('enemyHit');
                    hit_sound.volume = 1;
                    hit_sound.play();

                    this.enemyTimer = false;
                }      
           
            
            this.timer = this.game.time.create(false);
            this.timer.add(800,this.respawnPlayer,this);
            this.timer.start();
            
            
        },
        
        setEnemyTrue: function(){
            this.enemyTimer = true;
            this.timerEnemy.destroy();            
        },
        
        enemy2KillPlayer: function() {           
            
            
            this.pacman.body.velocity.x = 0;
            this.pacman.body.velocity.y = 0;
            
            if (this.current === Phaser.LEFT)
            {
                this.pacman.loadTexture('death-right-left',0);                
                this.pacman.scale.x = -1;
            }
            else if (this.current === Phaser.UP)
            {               
                this.pacman.loadTexture('death-up',0);
            }
            else if (this.current === Phaser.DOWN)
            {
                this.pacman.loadTexture('death-down',0);
            }
            else if (this.current === Phaser.RIGHT)
            {
                this.pacman.loadTexture('death-right-left',0);
            }     
            
            if(this.enemyTimer == true)
            {            

                this.timerEnemy = this.game.time.create(false);
                this.timerEnemy.add(2000,this.setEnemyTrue,this);
                this.timerEnemy.start();
                    
                hit_sound = game.add.audio('enemyHit');
                hit_sound.volume = 1;
                hit_sound.play();

                this.enemyTimer = false;
            }    
           
            
            this.timer = this.game.time.create(false);
            this.timer.add(800,this.respawnPlayer,this);
            this.timer.start();
            
            
        },
        
        respawnPlayer: function(){
            this.pacman.kill();  
            
            this.pacman = this.add.sprite((14 * 16) + 8, (19 * 16) + 8, 'pacman', 0);
            this.pacman.anchor.set(0.5);                                                   //Delete character and respawn him at the center again
            this.pacman.animations.add('munch', [0, 1, 2, 1,1, 0], 15, true);

            this.physics.arcade.enable(this.pacman);
            this.pacman.body.setSize(15, 15, 0, 0);
            
            this.cursors = this.input.keyboard.createCursorKeys();

            this.pacman.play('munch');
            this.move(Phaser.LEFT);
            
            if(this.livesTimer == true)
            {    
                this.livesCount--;
                
                this.timer = this.game.time.create(false);
                this.timer.add(2000,this.setLivesTrue,this);
                this.timer.start();
                
                this.livesTimer = false;
            }            
            
            if( this.livesCount == 3 )
            {
                 this.heart3.kill();
            }   
            else if( this.livesCount == 2  )
            {
                this.heart2.kill();
            }
            else if( this.livesCount == 1 )
            {
                this.heart1.kill();
            }
            else if( this.livesCount == 0)
            {
                music.stop();
                game.state.start('GameOver');
            }
                 
                  
        },
        
        
        
        setLivesTrue: function(){
            this.livesTimer = true;
            this.timer.destroy();
        },
        
        setPotionTrue: function(){
            this.potionTimer = true;
            this.timerPotion.destroy();
        },
        
        playerKillEnemy: function(pacman,enemy)
        {
            this.monsterDead = this.add.sprite(this.enemy.x , this.enemy.y, 'monsterDead', 0);
            this.monsterDead.animations.add('dead', [0, 1, 2, 3,4, 5], 9, false);
            
            if(this.enemyTimer == true)
            {            

                this.timerEnemy = this.game.time.create(false);
                this.timerEnemy.add(2000,this.setEnemyTrue,this);
                this.timerEnemy.start();
                    
                hit_sound = game.add.audio('enemyHit');
                hit_sound.volume = 1;
                hit_sound.play();

                this.enemyTimer = false;
            }    
            
            this.monsterDead.play('dead');
            this.timer = this.game.time.create(false);
            this.timer.add(800,this.deleteAnimation,this);
            this.timer.start();
            
            enemy.kill();      
            this.enemyCanDie = false;
            this.enemy2CanDie = false;
            this.pacman.loadTexture('pacman',0);
        },
        
        playerKillEnemy2: function(pacman,enemy2)
        {            
            this.monsterDead = this.add.sprite(this.enemy2.x , this.enemy2.y, 'monsterDead', 0);
            this.monsterDead.animations.add('dead', [0, 1, 2, 3,4, 5], 9, false);
            
            if(this.enemyTimer == true)
            {            

                this.timerEnemy = this.game.time.create(false);
                this.timerEnemy.add(2000,this.setEnemyTrue,this);
                this.timerEnemy.start();
                    
                hit_sound = game.add.audio('enemyHit');
                hit_sound.volume = 1;
                hit_sound.play();

                this.enemyTimer = false;
            }    
            
            this.monsterDead.play('dead');
            this.timer = this.game.time.create(false);
            this.timer.add(800,this.deleteAnimation,this);
            this.timer.start();
            
            enemy2.kill();      
            this.enemy2CanDie = false;
            this.enemyCanDie = false;
            this.pacman.loadTexture('pacman',0);
        },
        
        deleteAnimation: function(){
          
            this.monsterDead.kill();
            this.timer.destroy();
            
        },
          
        weaponTake: function(pacman,weapon){
            weapon.kill();
            
            i_sound = game.add.audio('itemSound');
            i_sound.volume = 1;
            i_sound.play();
            
            this.swordsCount--;
            this.swordText.text = ': ' + this.swordsCount;
            
            this.pacman.loadTexture('link-sword',0);
            
            this.enemyCanDie = true;
            this.enemy2CanDie = true;
            
            if(this.swordsCount > 0)
            {
                console.log("bemw");
                this.takeWeaponOneTime = true;  
            }
            
        },
        
        teleportTake: function(pacman,teleport){
            this.takeTeleportOneTime = true;
            teleport.kill();            
            
            i_sound = game.add.audio('itemSound');
            i_sound.volume = 1;
            i_sound.play();
            
            this.teleportCount++;
            
            this.potionsText.text = ': ' + this.teleportCount;
        },

        update: function () {
                        
            this.checkEnemyColision();
            this.physics.arcade.collide(this.pacman, this.layer);
            this.physics.arcade.collide(this.enemy, this.layer);
            this.physics.arcade.collide(this.enemy2, this.layer);
            this.timeNow = Math.round(game.time.now*0.001);         //Var to update timer
            
            this.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this);
            this.physics.arcade.overlap(this.pacman, this.bonus, this.eatBonus, null, this);
            
            if(this.enemyCanDie == false)
            {                
                this.physics.arcade.overlap(this.enemy, this.pacman, this.enemyKillPlayer, null, this);
            }
            else
            {               
                this.physics.arcade.overlap(this.pacman, this.enemy, this.playerKillEnemy, null, this);
            }    
            
            
            
            if(this.enemy2CanDie == false)
            {                
                this.physics.arcade.overlap(this.enemy2, this.pacman, this.enemy2KillPlayer, null, this);
            }
            else
            {               
                this.physics.arcade.overlap(this.pacman, this.enemy2, this.playerKillEnemy2, null, this);
            }            
            
            if( ((score + Bonus) % 100) == 0 && this.takeWeaponOneTime == true  && score > 0)
            {
                this.weapon.create((14 * 16), (13 * 16) + 5, 'weapon');       
                this.takeWeaponOneTime = false;
            }
            
            if( ((score + Bonus) % 10) == 0 && this.takeTeleportOneTime == true && score > 0)
            {
                this.teleport.create((12 * 16), (14 * 16) + 1, 'teleport-potion');       
                this.takeTeleportOneTime = false;
            }
            
            if (this.spaceKey.isDown && this.teleportCount >= 1)
            {
                if(this.potionTimer == true)
                {    
                    this.teleportCount--;
                    this.teleportPacman();

                    this.timerPotion = this.game.time.create(false);
                    this.timerPotion.add(2000,this.setPotionTrue,this);
                    this.timerPotion.start();
                    
                    t_sound = game.add.audio('teleportSound');
                    t_sound.volume = 1;
                    t_sound.play();

                    this.potionTimer = false;
                }             
            }
            
            this.physics.arcade.overlap(this.pacman, this.weapon, this.weaponTake, null, this);
            this.physics.arcade.overlap(this.pacman, this.teleport, this.teleportTake, null, this);
            
            this.time.text = ": " + this.timeNow +" Sec";             //change timer text
            this.bonus.text 
            
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