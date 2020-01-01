import React, { Component } from "react"
import api from '../utils/api'
import io from 'socket.io-client';

export default class GM extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameExists: true,
            characters: [],
            endpoint: 'http://localhost:3001'
        }
        this.joinGame = this.joinGame.bind(this)
        this.socketEvent = this.joinGame.bind(this)
    }

    async componentDidMount() {
        
        const gameId = this.props.match.params.id
        
        await api.getSession().then( session => {
            this.props.updateSession(session.data)
            console.log("session id: ", this.props.session)
        })

        if (this.props.session) {
            const { endpoint } = this.state
            const socket = io(endpoint)
            const game = {
                showNameModal: false,
                room: gameId,
                session: this.props.session
            }

            socket.on('player join', message => {
                console.log(message);
            })
    
            socket.on('character added', message => {
                console.log("Game Created Message: " + message)
            })
    
            // This will trigger a dead page screen
            socket.on('no game', message => {
                this.setState({gameExists: false})
                alert(message)
                socket.disconnect()
                console.log("SOCKET DISCONNECTED?", socket.disconnected)
            })

            socket.emit('player join', game)

            if (!this.props.name && this.state.gameExists) {
                this.setState({ showNameModal: true })
                console.log("Name has not been entered.")
            }
        }
    }

    joinGame(room) {
        const { endpoint } = this.state
        const socket = io(endpoint)

        socket.emit('player join', room)

    }

    socketEvent(socket) {
        // Socket event listeners
        socket.on('player join', message => {
            console.log(message);
        })

        socket.on('character added', message => {
            console.log("Game Created Message: " + message)
        })

        // This will trigger a dead page screen
        socket.on('no game', message => {
            alert(message)
        })
    }

    render() {
        return (
            <div>
                <p>This is the game page</p>
            </div>
        )
    }

}