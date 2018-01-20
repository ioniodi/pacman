var Preloader = {
	preload: function(){
        
            this.load.image('background', 'assets/back.png');
            this.load.spritesheet('button', 'assets/button.png',222,75);
            this.load.spritesheet('buttonRestart', 'assets/buttonRestart.png',222,75);
            this.load.spritesheet('buttonHelp', 'assets/buttonHelp.png',222,75);
            this.load.spritesheet('buttonBack', 'assets/buttonBack.png',222,75);
            this.load.spritesheet('helpScreen', 'assets/helpScreen.png');
            
            this.load.image('dot', 'assets/dot.png');
            this.load.image('dot1', 'assets/dot1.png');
            this.load.image('dot2', 'assets/dot2.png');
            this.load.image('dot3', 'assets/dot3.png');
            this.load.image('dot4', 'assets/dot4.png');
            this.load.image('bonus', 'assets/bonus.png');
            this.load.image('bonusText', 'assets/bonusText.png');
            this.load.image('timer', 'assets/timer.png');
            this.load.image('heart', 'assets/heart.png');
            this.load.image('weapon', 'assets/weapon.png');
            this.load.image('teleport-potion', 'assets/teleport-potion.png');
            this.load.image('death-down', 'assets/death-down.png');
            this.load.image('death-right-left', 'assets/death-right-left.png');
            this.load.image('death-up', 'assets/death-up.png');
            
            game.load.audio('pacman-music', 'assets/music.mp3');
            game.load.audio('themeMusic', 'assets/themeMusic.mp3');
            game.load.audio('bonus_sound', 'assets/bonus_sound.mp3');
            game.load.audio('itemSound', 'assets/itemSound.mp3');
            game.load.audio('teleportSound', 'assets/teleportSound.mp3');
            game.load.audio('enemyHit', 'assets/enemyHit.mp3');
            game.load.audio('DeathSound', 'assets/DeathSound.mp3');
            game.load.audio('talk', 'assets/talk.mp3');
            game.load.audio('pacman-music2', 'assets/level2Sound.mp3');
            game.load.audio('endSound', 'assets/end.mp3');
            
            this.load.image('tiles2', 'assets/pacman-tiles_2.png');
            this.load.image('tiles', 'assets/pacman-tiles.png');
            this.load.image('gmo', 'assets/gameOver.png');
            this.load.image('end', 'assets/end.png');
            
            this.load.image('ohno', 'assets/text/ohno.png');
            this.load.image('stole', 'assets/text/stole.png');
            this.load.image('before', 'assets/text/before.png');    
        
            this.load.spritesheet('pacman', 'assets/link.png', 32, 32);
            this.load.spritesheet('link-sword', 'assets/link-sword.png', 32, 32);
            this.load.spritesheet('enemy', 'assets/enemy.png', 32, 32);
            this.load.spritesheet('monsterDead', 'assets/monsterDead.png', 27, 28);
            this.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('map2', 'assets/pacman-map_2.json', null, Phaser.Tilemap.TILED_JSON);
             
	},
	
	create: function(){
		game.state.start('MainMenu');	
	},
};
