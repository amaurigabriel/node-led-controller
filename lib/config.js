var app = require('../app');
var io = app.get('io');
var board;
var leds = {};

function configIo(){
    io.on('connection', function(socket){
        if (board.isReady)
            socket.emit('changed', getBoardStatus());

        socket.on('toggle_led', function(led_number){
            leds[led_number].toggle();
            ioChanged();
        });
    });
}

function ioChanged(){
    io.sockets.emit('changed', getBoardStatus());
}

function getBoardStatus(){
    return {
        led2 : leds.led2.isOn? 1 : 0,
        led13 : leds.led13.isOn? 1 : 0,
    };
}

module.exports = function(){
    var five = app.get('five');

    board = new five.Board({
        port : "COM3"
    });

    app.set('board', board);

    board.on("ready", function() {
        leds.led2 = new five.Led(2);
        leds.led13 = new five.Led(13);

        this.digitalWrite(13, 0);
        this.digitalWrite(2, 0);

        ioChanged();
    });    

    configIo();
};