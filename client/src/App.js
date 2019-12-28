import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGame, joinGame, session, socketEventListener } from './api';
import axios from 'axios';
import io from 'socket.io-client';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: "",
      roomJoin: "",
      name: "",
      gm: false,
      player: false,
      endpoint: 'http://localhost:3001',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleJoin = this.handleJoin.bind(this)
    
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = io(endpoint)
    socketEventListener(socket)
    session()
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Handle join needs to retrieve all
  handleJoin(event) {
    event.preventDefault();
    console.log("Join Room: "+ this.state.roomJoin)
    joinGame( {room: this.state.roomJoin })
  }

  // Needs a constructor to pass
  handleSubmit = (event) => {
    event.preventDefault();
    const game = { name: this.state.name }
    createGame(game)
    console.log("Room State: "+this.state.name)
    // createGame(game)
  }

  render() {
    const { room, gm, player, name } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
          <Form>
            <Form.Control
              className="form-input"
              type='text'
              id="room"
              name="room"
              placeholder="Session Name"
              value={this.state.room}
              onChange={this.handleChange}
            />
          <Button
              variant="dark"
              onClick={this.handleSubmit}
              type="submit"
          >
            Create
          </Button>
          <Form.Control
              className="form-input"
              type='text'
              id="name"
              name="name"
              placeholder="Player Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          <Button
              variant="dark"
              onClick={this.handleSubmit}
              type="submit"
          >
            Create
          </Button>
          </Form>
        </header>
      </div>
    )
  }
}

export default App;
