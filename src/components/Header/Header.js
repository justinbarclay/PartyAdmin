import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {setAuthState} from '../../actions/auth'; 
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
    this.props.dispatch(setAuthState(false));
    this.props.history.push("/");
  }
  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="/"></a>
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle} href="#">&#9776;</a>
          </li>
        </ul>
        <ul className="nav navbar-nav mr-2">
          <li className="nav-item" onClick={this.logout} >
            <a className="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </header>
    )
  }
}

let header =  withRouter(connect()(Header))
export default header;
