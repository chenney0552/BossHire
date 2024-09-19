module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('socketio connected');
        socket.on('sendMsg', (data) => {
            console.log('server received msg', data);
            io.emit('receiveMsg', {name: 'server', msg: 'server received msg'});
            console.log('server emit receiveMsg');
        });
    });
}