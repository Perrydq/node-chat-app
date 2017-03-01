var socket = io();

socket.on('connect', function() {
    
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if(err){
            alert(err);
            window.location.href='/'
        } else {
            console.log('no error');
        }
    });

    // socket.emit('createMessage', {
    //     from: 'johnnyB',
    //     text: 'hey this is john'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
    console.log('Users List:', users);
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});


socket.on('newMessage', function(newMessage) {
    var formattedTime = moment(newMessage.createdAt).format('h:mma');
    // var li = jQuery('<li></li>');
    // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);

    // jQuery('#messages').append(li);

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: newMessage.from,
        text: newMessage.text,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mma');
    // var li = jQuery('<li></li>');
    // var a = jQuery(`<a target="_blank">My Current Location</a>`)

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    var template = jQuery('#location-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
//     }, function(data) {
//         console.log('Got it', data);
//     });


    jQuery('#message-form').on('submit', function(e){
        e.preventDefault();
        var messageTextBox = jQuery('[name=message]');
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function(){
            messageTextBox.val('')
        })
    });

    var locationButton = jQuery('#send-location');
    locationButton.on('click', function() {
        if ("geolocation" in navigator) {
            locationButton.attr('disabled', 'disabled').text('Sending Location...');
            navigator.geolocation.getCurrentPosition(function(position){
                // console.log(position);
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                locationButton.removeAttr('disabled').text('Send Location');
            }, function(err) {
                locationButton.removeAttr('disabled').text('Send Location');
                alert('unable to fetch locaiton');
            })
        } else {
            return alert('geolocation not supported by your browser');
        }
    });
    
//if (scrollTop + clientHeight - 12) {} 

function scrollToBottom() {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollHeight = messages.prop('scrollHeight');
    var scrollTop = messages.prop('scrollTop');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
        console.log('scroll to bottom');
        messages.scrollTop(scrollHeight);
    }
}