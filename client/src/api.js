import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

const createEncounter = (room) => {

        socket.emit('room', room)
        console.log(room)
    // socket.join('some room').emit(console.log('some event'));
}

export { createEncounter }