// import io from 'socket.io-client';
import axios from 'axios'
// const socket = io('http://localhost:3001');

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

const createGame = (socket, name) => {

    console.log(name)
    axios.post('/game', name).then(res => {

        console.log("Game and User Created", res.data)
        let gameId = res.data.game.id
        socket.emit('create game', gameId)
    })
    // Need to make an API call to add the Game to mysql, on success emit 
    // addChar({ player: socket.id, character: 'succ hole', playerName: 'Tony Pastrami', room: socket.id })


}

const session = () => {
    console.log("making session call...")
    axios.get('/session').then(res => {
        console.log("Session Id =====> ", res.data)
    }).catch(err => {
        console.log(err)
    })
}

const joinGame = (socket, room) => {
    // socket.join(room);
    socket.emit('player join', room)
}


const addChar = (socket, character) => {
    // { gameId, name, playerName, npc }
    socket.emit('add character', character)
}


// =============== Event Listener ==========================
// Instantiated on App.js with socket variable above. Seems weird but it works, so...
const socketEventListener = socket => {

    
    socket.on('player join', message => {
        console.log(message);
    })

    socket.on('game created', message => {
        console.log("Game Created Message: "+ message)
    })



    

    // socket.on('new character', charList => {
        
    // })

}




// DM features 
// Next Player
// Add/Remove player controlled and dm controlled characters.
// Visual to show when it is DM turn

// Player Features
// Claim Character: On connect they will either claim or create character. Claim should be disabled when there are no unclaimed.
// Create Unclaimed PC
// Visual to show when it is player turn

export { createGame, addChar, joinGame, session, socketEventListener }