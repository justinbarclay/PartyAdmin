import React, { Component } from 'react';

class Header extends Component {
  constructor(){
    super();
    this.logout = this.logout.bind(this);
  }
  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  logout(e){
    e.preventDefault();
    window.localStorage.clear();
    this.props.logout(true);
  }
  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a> 
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle} href="#">&#9776;</a>
          </li>
        </ul>
        <ul className="nav">
          <li className="nav-item" onClick={this.logout} >
            <a className="nav-link nav" href="#">Logout</a>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
