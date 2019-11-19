import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createEncounter, joinGame } from './api';
import axios from 'axios';
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
      name: null,
      gm: false,
      player: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleJoin = this.handleJoin.bind(this)
    // this.componentDidMount = this.componentDidMount.bind(this)
  }

  // componentDidMount() {
  //   subscribeToEncounter()
  // }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.room)
  }

  handleJoin(event) {
    event.preventDefault();
    console.log("Join Room: "+ this.state.roomJoin)
    joinGame( {room: this.state.roomJoin })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Room State: "+this.state.room)
    createEncounter()
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
              id="roomJoin"
              name="roomJoin"
              placeholder="Room Id"
              value={this.state.roomJoin}
              onChange={this.handleChange}
            />
          <Button
              variant="dark"
              onClick={this.handleJoin}
              type="submit"
          >
            Join
          </Button>
          </Form>
        </header>
      </div>
    )
  }
}

export default App;
