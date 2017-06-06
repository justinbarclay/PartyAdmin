import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from '../../views/Pages/Login';
import SignUp from '../../views/SignUp';

class Simple extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Router>
          <div>
            <Route exact path='/' component={() => <Login login={this.props.login}/>} />
            <Route path='/signup/:token' component={SignUp}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default Simple;
