import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from '../../components/Header/';
import Dashboard from '../../views/Dashboard/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import 'superagent';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
          <Header logout={this.props.logout} />
          <div className="app-body">
            <Sidebar {...this.props}/>
            <main className="main">
              <div className="container-fluid">
                <Route exactly path="/" name="Home" component={ Dashboard }/>
              </div>
            </main>
            <Aside />
          </div>
          <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default Full;
