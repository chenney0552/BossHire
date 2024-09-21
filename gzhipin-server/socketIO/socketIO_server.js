const {ChatModel} = require('../db/models')
module.exports = function (server) {
    const io = require('socket.io')(server);

    // listen connection
    io.on('connection', (socket) => {
        console.log('a client socketio connected');
        // listen sendMsg event
        socket.on('sendMsg', ({from, to, content}) => {
            console.log('server received msg', {from, to, content});

            // process the msg and save to db
            const chat_id = [from, to].sort().join('_');
            const create_time = Date.now();
            new ChatModel({from, to, content, chat_id, create_time}).save(function (error, chatMsg) {
                // send message to the client
                io.emit('receiveMsg', chatMsg);
            });
        });
    });
}