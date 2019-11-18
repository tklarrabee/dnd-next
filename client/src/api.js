import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function subscribeToEncounter (interval, name, password) {
    socket.on('connect', console.log('Hopefully not a waste.'));
}

export { subscribeToEncounter }