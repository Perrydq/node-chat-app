var socket = io();

socket.on('connect', function() {
    console.log('Connected to server!');

    // socket.emit('createMessage', {
    //     from: 'johnnyB',
    //     text: 'hey this is john'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage) {
    console.log('new message received: ', newMessage);
    console.log(new Date().toLocaleTimeString(newMessage.createdAt));

    var li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
//     }, function(data) {
//         console.log('Got it', data);
//     });

    jQuery('#message-form').on('submit', function(e){
        e.preventDefault();

        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('[name=message]').val()
        }, function(){
            
        })
    });