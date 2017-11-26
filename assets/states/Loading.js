var Game = [];

Game.Loading = function (game) {

};

Game.Loading.prototype = {
    preload: function () {
        textManager.createText(game, 180, 300, 'Loading...', colors.white, false);
    },
    
    create: function () {
        this.state.start('Preloader');
    }
}
