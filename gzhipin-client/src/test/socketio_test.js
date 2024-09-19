import io from 'socket.io-client';

const socket = io('ws://localhost:4000');

socket.on('connect', () => {
    console.log('socketio connected');
});

socket.on('receiveMsg', (data) => {
    console.log('client received msg', data);
});

socket.emit('sendMsg', {name: 'client', date: Date.now()});
console.log('client emit sendMsg', {name: 'client', date: Date.now()});