import React, { Component } from "react"
// import api from '../utils/api'
import io from 'socket.io-client';

export default class GM extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            characters: [],
            endpoint: 'http://localhost:3001'
        }
        this.joinGame = this.joinGame.bind(this)
    }

    componentDidMount() {
     if(this.props.session) {
        const { endpoint } = this.state
        const socket = io(endpoint)
        const game = { 
            room: this.props.match.params.id,
            session: this.props.session
        }
    
        console.log("Session PROPS: "+ this.props.session)
    
    
        // Socket event listeners
        socket.on('player join', message => {
            console.log(message);
        })
        
        socket.on('character added', message => {
            console.log("Game Created Message: " + message)
        })
    
        socket.on('no game', message => {
            alert(message)
        })
    
    
        // playing with async functions!
    
        socket.emit('player join', game)
     }   
    }
    
    componentDidUpdate(prevSession) {
        if (this.props.session !== prevSession.session ) {
            const { endpoint } = this.state
            const socket = io(endpoint)
            const game = { 
                room: this.props.match.params.id,
                session: this.props.session
            }
        
            console.log("Session PROPS: "+ this.props.session)
        
        
            // Socket event listeners
            socket.on('player join', message => {
                console.log(message);
            })
            
            socket.on('character added', message => {
                console.log("Game Created Message: " + message)
            })
        
            socket.on('no game', message => {
                alert(message)
            })
        
        
            // playing with async functions!
        
            socket.emit('player join', game)
        
            /*
                TODO
                get users
            */

        }
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