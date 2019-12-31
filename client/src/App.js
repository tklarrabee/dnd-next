import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import api from './utils/api';
import Home from './pages/Home'
import GM from './pages/GM'
// import axios from 'axios';
// import io from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: "",
      roomJoin: "",
      name: "",
      session: "",
      gm: false,
      player: false,
      endpoint: 'http://localhost:3001'
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.createGame = this.createGame.bind(this);
    // this.handleJoin = this.handleJoin.bind(this)

  }

  componentDidMount() {
    // const { endpoint } = this.state
    // const socket = io(endpoint)


    // socket.on('game created', message => {
    //   console.log("Game Created Message: " + message)
    // })

    // socket.on('player join', message => {
    //   console.log(message);
    // })

    // socket.on('character added', message => {
    //   console.log("Game Created Message: " + message)
    // })

  }


  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home 
            name={this.state.name}
            room={this.state.room}
            />}
            />
            <Route exact path="/:id" render={(props) => <GM 
            {...props}
            name={this.state.name}
            room={this.state.room}
            />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
