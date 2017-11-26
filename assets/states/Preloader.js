Game.Preloader = function (game) {
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    create: function() {
        game.state.start('Level1');
    }
}
