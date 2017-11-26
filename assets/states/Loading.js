var Game = [];

Game.Loading = function (game) {

};

Game.Loading.prototype = {
    init: function () {
        this.stage.disableVisibilityChange = true;
    }
    
    preload: function () {
        this.load.image('preloaderbar', 'assets/');
    }
    
    create: function () {
        this.state.start('Preloader');
    }
}
