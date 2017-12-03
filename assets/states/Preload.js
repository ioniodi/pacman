var Preload = function (game) {}

Preload.prototype = {
	preload: function() {
        var loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loading');
        loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.image('title', 'assets/states/buttons/title.png');
	    this.game.load.image('play', 'assets/states/buttons/play.png');
	    this.game.load.image('level2', 'assets/states/buttons/level.png');

		//level 1
		//  Needless to say, graphics (C)opyright Namco
		this.load.baseURL = 'https://geocfu.github.io/pacman/';
        this.load.crossOrigin = 'anonymous';

        this.load.image('dot', 'assets/dot.png');
        this.load.image('blackberry', 'assets/blackberry.png');
        this.load.image('cherry', 'assets/cherry.png');
        this.load.image('kiwi', 'assets/kiwi.png');
        this.load.image('dynamite', 'assets/dynamite.png');
        this.load.image('soldier', 'assets/soldier.png');
        this.load.image('teleport_portal_left', 'assets/teleport_portal_left.png');
        this.load.image('teleport_portal_right', 'assets/teleport_portal_right.png');
        this.load.image('knife', 'assets/knife.png');
        this.load.image('blackberry-tiles', 'assets/blackberry.png');
        this.load.image('cherry-tiles', 'assets/cherry.png');
        this.load.image('kiwi-tiles', 'assets/kiwi.png');
        this.load.image('tiles', 'assets/pacman-tiles.png');

        this.load.spritesheet('pacman', 'assets/giannis_rambo_scaled_flipped.png', 32, 32);
        this.load.tilemap('map', 'assets/pacman-map_fruits.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.audio('chopping', 'assets/giannakis_is_cutting.mp3');
	},

	create: function(){
        console.log('%cPreload -> create intitialized', 'color:white; background:red');
		this.game.state.start('MainMenu');
	}
}
