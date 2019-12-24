module.exports = io => {

    io.on('connection', (socket) => {
        // 
        console.log('a user has connected. ID: ' + socket.id);
        
        // Socket 'create game' will create a room named after game id from mysql.
        // emits creating game/game created
        // socket.on create game needs to grab a session Id from express-session
        
        socket.on('create game', game => {
            console.log("Room Created: " + game)
            socket.join(game)
            socket.room = game;
            socket.emit('broadcast', 'Game Created')
            console.log("user created game: "+ socket.room)
        });
        
        socket.on('player join', player => {
            console.log(player)
            socket.broadcast.in(player.room).emit('player join', 'broadcasting because character added')
            console.log('broadcasting to room: ' + player.room)
        });
        
        // This will be the start of an encounter, 
        // figure out serverside and client side timer. 
        socket.on('play', play => {
            console.log('custom emit works')
        });
        
        // socket needs to emit a disconnection notificaiton to group
        
        socket.on('disconnect', socket => {
            console.log('a user has disconnected')
        });
        
        
    });
}