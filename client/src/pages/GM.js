import React, { Component } from "react"
import io from 'socket.io-client';

export default class GM extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: [],
            endpoint: 'http://localhost:3001'
        }
        this.joinGame = this.joinGame.bind(this)
    }

    async componentDidMount() {
        const { endpoint } = this.state
        const socket = io(endpoint)
        const room = this.props.match.params.id

        // Socket event listeners
        socket.on('player join', message => {
            console.log(message);
        })
        
        socket.on('character added', message => {
            console.log("Game Created Message: " + message)
        })


        // playing with async functions!
        this.consoleA().then(butt => { console.log(butt)})
        await socket.emit('player join', room)
        
        

    }

    consoleA = async () => {
        return 'test'
    }

    joinGame(room) {
        const { endpoint } = this.state
        const socket = io(endpoint)

        socket.emit('player join', room)

    }

    render() {
        return (
            <div>
                <p>This is the game page</p>
            </div>
        )
    }

}