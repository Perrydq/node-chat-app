const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const port = process.env.PORT || 3000;

//server public folder
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.roomName)){
            return callback('Name and Room Name are required');
        } else {
            socket.join(params.roomName);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.roomName);
            io.to(params.roomName).emit('updateUserList', users.getUserList(params.roomName));
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
            socket.broadcast.to(params.roomName).emit('newMessage', generateMessage('Admin', `${params.name} has joined the channel`));
            callback();
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chatroom.`));
            console.log('disconnect happened', user.room);
        }
    });

    socket.on('createMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
            callback();
        }
    })

    socket.on('createLocationMessage', coords => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    })
});

//listen on port 3000
//console log server up
server.listen(port, () => {
    console.log('server up on port 3000');
});
