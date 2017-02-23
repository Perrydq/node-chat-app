const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

//server public folder
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey, what is going on?',
        createdAt: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('New Message', newMessage);
        socket.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        })
    })
});

//listen on port 3000
//console log server up
server.listen(port, () => {
    console.log('server up on port 3000');
});
