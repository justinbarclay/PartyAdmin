import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/';
import Dashboard from '../../views/Dashboard/';
import NewPart from '../../views/NewPart/';
import Part from '../../views/Part/';
import _404 from '../../views/Pages/Page404/';
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
              <Sidebar {...this.props} />
              <main className="main">
                <div className="container-fluid">
                  <Switch>
                    <Route exact path="/" name="Home" component={Dashboard} />
                    <Route path="/parts/:id" name="Part" component={Part} />
                    <Route path="/parts/new" name="NewPart" component={NewPart} />
                    <Route path="*" component={_404} />
                  </Switch>
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
