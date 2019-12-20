import io from 'socket.io-client';
const socket = io('http://localhost:3001');

// 1.
// Player Name
// Turn Duration
// 2. Setup
// Add Characters
// Player Controlled or DM Controlled
// 3.
// Start Encounter/Pause encounter
// Initiative Value cannot be null for any character to start
// New Encounter, Remove DM chars from previous encounter yes/no
// global next
// 4. 
// console.log(room, socket.id)
// socket.emit('play', {[socket.id]: room.id, password: true})
// socket.join('some room').emit(console.log('some event'));

const createGame = game => {

    // Need to make an API call to add the Game to mysql, on success emit 
    socket.emit('create game', socket.id)

    console.log(game)

    // addChar({ player: socket.id, character: 'succ hole', playerName: 'Tony Pastrami', room: socket.id })


}

const joinGame = room => {
    socket.join(room);
    socket.emit('player join', room)
}


const addChar = character => {
    socket.emit('add character', character)
}

socket.on('player join', message => {
    console.log(message);
})


// DM features 
// Next Player
// Add/Remove player controlled and dm controlled characters.
// Visual to show when it is DM turn

// Player Features
// Claim Character: On connect they will either claim or create character. Claim should be disabled when there are no unclaimed.
// Create Unclaimed PC
// Visual to show when it is player turn

export { createGame, addChar, joinGame }