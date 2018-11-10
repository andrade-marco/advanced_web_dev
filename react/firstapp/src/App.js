import React, { Component } from 'react';
import Pet from './Pet.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">First React App</h1>
        </header>
        <Pet/>
      </div>
    );
  }
}

export default App;
