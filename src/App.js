import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Dashboard from './scenes/Dashboard'


class App extends Component {
  render() {
    return (
      <Switch>
          <Route path="/home" >
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
          </Route>
          <Route path='/dashboard'>
              <Dashboard />
          </Route>
      </Switch>
    );
  }
}

export default App;
