import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/';
import Dashboard from '../../views/Dashboard/';
import EditPart from '../../views/EditPart/';
import NewPart from '../../views/NewPart/';
import Part from '../../views/Part/';
import Users from '../../views/Users/';
import User from '../../views/User/';
import NewUser from '../../views/NewUser/';
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
            <Header logout={this.props.logout}/>
            <div className="app-body">
              <Sidebar {...this.props} />
              <main className="main pt-3">
                <div className="container-fluid">
                  <Switch>
                    <Route exact path="/" name="Home" component={Dashboard} />
                    
                    <Route exact path="/parts/new" name="NewPart" component={NewPart} />
                    <Route exact path="/parts/:id" name="Part" component={Part} />
                    <Route exact path="/parts/:id/edit" name="EditPart" component={EditPart} />
                    
                    <Route exact path="/users" naem="Users" component={Users} />
                    <Route exact path="/users/new" naem="User" component={NewUser} />
                    <Route exact path="/users/:id" naem="User" component={User} />
                    
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
