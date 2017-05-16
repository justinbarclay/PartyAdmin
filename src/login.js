import React, { Component } from 'react';
import logo from './logo.svg';
import './login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <label>Username
            <input className="baseInput" placeholder="Enter username..."/>
          </label>
        <label>Password
            <input className="baseInput" placeholder="Enter password..."/>
        </label>
        <button className="btn btn-1 btn-1b">Submit</button>
      </div>
    );
  }
}

export default Login;
