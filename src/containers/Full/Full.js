import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/';
import Dashboard from '../../views/Dashboard/';
import EditPart from '../../views/EditPart/';
import NewPart from '../../views/NewPart/';
import Part from '../../views/Part/';
import Users from '../../views/Users/';
import User from '../../views/User/';
import SignUp from '../../views/SignUp/';
import NewUser from '../../views/NewUser/';
import _404 from '../../views/Pages/Page404/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import ProtectedRoute from '../../components/ProtectedRoute/';

class Full extends Component {
  render() {
    return (
      <div className="app" id="react-no-print">
        
          <div>
            <Header logout={this.props.logout}/>
            <div className="app-body">
              <Sidebar {...this.props} />
              <main className="main pt-3">
                <div className="container-fluid">
                  <Switch>

                    <ProtectedRoute exact path="/" name="Home" component={Dashboard} />
                    
                    <ProtectedRoute exact path="/parts/new" name="NewPart" component={NewPart} />
                    <ProtectedRoute exact path="/parts/:id" name="Part" component={Part} />
                    <ProtectedRoute exact path="/parts/:id/edit" name="EditPart" component={EditPart} />
                    
                    <ProtectedRoute exact path="/users" name="Users" component={Users} />
                    <ProtectedRoute exact path="/users/new" name="User" component={NewUser}/>
                    <ProtectedRoute exact path="/users/:id" name="User" component={User} />

                    <ProtectedRoute path="/signup/:token" name="Sign Up" component={SignUp} />

                    <ProtectedRoute path="*" component={_404} />

                  </Switch>              
                </div>
              </main>
              <Aside />
            </div>
            <Footer />
          </div>
        
      </div>
    );
  }
}

export default Full;
