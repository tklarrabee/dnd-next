import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createEncounter } from './api';
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
      name: null,
      gm: false,
      player: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this. handleChange.bind(this)
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


  handleSubmit = (event) => {
    event.preventDefault();
    console.log("SUBMIT, MORTAL: "+this.state.room)
    createEncounter(this.state.room)
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
          </Form>
        </header>
      </div>
    )
  }
}

export default App;
