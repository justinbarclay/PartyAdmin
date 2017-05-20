import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from '../../views/Pages/Login';
import Register from '../../views/Pages/Register';

class Simple extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Router>
          <div>
            <Route exact path='/' component={Login}/>
            <Route path='/register' component={Register}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default Simple;
