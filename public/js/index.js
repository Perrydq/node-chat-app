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
});