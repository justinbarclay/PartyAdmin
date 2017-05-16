import React, { Component } from 'react';
import LoggedOut from './loggedOut.js';
import './header.css'
class Header extends Component {
  render() {
    let currentHeader = LoggedOut;
    return (
      <div className="headerContainer">
        <currentHeader/>
      </div>  
    );
  }
}

export default Header;
