import React, { Component } from 'react';
import './App.css';
import Login from './login.js';
import Header from './header.js';
import './login.js'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Router>
          <div>
            <Route exact path="/" component={Login}/>
          </div>
        </Router>
      </div>  
    );
  }
}

export default App;
