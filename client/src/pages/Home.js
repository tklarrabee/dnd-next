import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from '../utils/api';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from '../logo.svg';
import '../App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            room: "",
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createGame = this.createGame.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const name = { name: this.state.name }
        this.createGame(name)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createGame (name) {
        // const { endpoint } = this.state
        // const socket = io(endpoint)

        api.newGame(name).then(res => {
            console.log("Game and User Created", res.data)
            let gameId = res.data.game.id
            this.setState({ redirectTo: "/" + gameId })
        })

    }


    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {

            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />

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
}

