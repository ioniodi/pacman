Game.Preloader = function (game) {
    this.loadingBar = null;
};

Game.Preloader.prototype = {
    preload: function () {
        this.loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, 'Loading');
        this.loadingBar.anchor.setTO(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.loadingBar);
    },
    
    create: function() {
        game.state.start('Level1');
    }
}
