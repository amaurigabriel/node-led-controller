var socket = io('localhost:5555');

$(function(){
    $('.led button').click(function(){
        var led_number = $(this).closest('.led').is('.led2') ? 'led2' : 'led13';

        socket.emit('toggle_led', led_number);
    });

    socket.on('changed', function(status){
        if (status.led2){
            $('.led2').removeClass('on').addClass('off');
        }else{
            $('.led2').removeClass('off').addClass('on');
        }

        if (status.led13){
            $('.led13').removeClass('on').addClass('off');
        }else{
            $('.led13').removeClass('off').addClass('on');
        }
    });
});