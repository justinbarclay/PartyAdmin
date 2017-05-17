import React, { Component } from 'react';
import LoggedOut from './loggedOut.js';
import './header.css'
class Header extends Component {
  render() {
    let currentHeader = LoggedOut;
    return (
      <div className="headerContainer">
        <div className="logoContainer">
          <img src="noun_542472_cc.svg" alt="logo" height="100" className="svg logo"/>
          <div className="logoName">Party</div>
        </div>
        <currentHeader/>
      </div>  
    );
  }
}

export default Header;
