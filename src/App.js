import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login.js';
import Header from './header.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="bodyContainer">
          <Login/>
        </div>
      </div>  
    );
  }
}

export default App;
