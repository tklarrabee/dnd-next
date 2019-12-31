import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import api from './utils/api';
import Home from './pages/Home'
import GM from './pages/GM'
// import axios from 'axios';
// import io from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      session: ""
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.createGame = this.createGame.bind(this);
    // this.handleJoin = this.handleJoin.bind(this)

  }

  componentDidMount() {
    api.getSession().then( session => {
      this.setState({session: session.data})
      console.log("session id: ", this.state.session)
    })
  }


  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home 
            />}
            />
            <Route exact path="/:id" render={(props) => <GM 
            {...props}
            session={this.state.session}
            />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
