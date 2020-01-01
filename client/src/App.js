import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import api from './utils/api';
import Home from './pages/Home'
import GM from './pages/GM'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      session: ""
    };
    this.updateName = this.updateName.bind(this)
    this.updateSession = this.updateSession.bind(this)
  }



  updateName(name) {
    this.setState({name: name})
  }
  
  updateSession(session) {
    this.setState({session: session})
  }

  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <Home
            {...props}
            name={this.state.name}
            session={this.state.session}
            updateName={this.updateName}
            updateSession={this.updateSession}
            />}
            />
            <Route exact path="/:id" render={(props) => <GM 
            {...props}
            name={this.state.name}
            session={this.state.session}
            updateName={this.updateName}
            updateSession={this.updateSession}
            />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
