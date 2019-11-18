import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

const subscribeToEncounter = (interval, name, password, room) => {
    socket.on('connect', () => {
        socket.emit('room', 'room')
    });
    // socket.join('some room').emit(console.log('some event'));
}

export { subscribeToEncounter }