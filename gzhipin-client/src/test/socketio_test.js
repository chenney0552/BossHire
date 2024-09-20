import io  from 'socket.io-client';

const socket = io('ws://localhost:4000');

socket.emit('sendMsg', {name: 'abc', msg: 'client send msg'});
console.log('client emit sendMsg', {name: 'abc', msg: 'client send msg'});

// listen receiveMsg event
socket.on('receiveMsg', (data) => {
    console.log('client received msg', data);
});