var Game = [];

Game.Loading = function (game) {

};

Game.Loading.prototype = {
    preload: function () {
        this.load.image('loading', 'assets/states/loading.png');
    },
    
    create: function () {
        this.state.start('Preloader');
    }
}
