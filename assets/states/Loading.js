var Game = [];

Game.Loading = function (game) {

};

Game.Loading.prototype = {
    init: function () {
        this.stage.disableVisibilityChange = true;
    },
    
    preload: function () {
        this.load.image('Loading', 'assets/states/loading.png');
    },
    
    create: function () {
        this.state.start('Preloader');
    }
}
