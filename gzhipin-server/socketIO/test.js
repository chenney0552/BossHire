module.exports = function (server) {
    const io = require('socket.io')(server);

    // listen connection
    io.on('connection', (socket) => {
        console.log('a client socketio connected');
        // listen sendMsg event
        socket.on('sendMsg', (data) => {
            console.log('server received msg', data);
            data.name = data.name.toUpperCase();
            socket.emit('receiveMsg', data);
            console.log('server emit receiveMsg');
        });
    });
}