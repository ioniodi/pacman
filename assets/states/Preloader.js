Game.Preloader = function (game) {
    this.loadingBar = null;
};

Game.Preloader.prototype = {
    preload: function () {
        this.loadingBar = this.add.sprite(180, 300, 'loading');
        this.loadingBar.anchor.setTO(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.loadingBar);
    },
    
    create: function() {
        game.state.start('Level1');
    }
}
