import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import Login from '../../views/Pages/Login';
import SignUp from '../../views/SignUp';
import ResetPassword from '../../views/ResetPassword';

class Simple extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/signup/:token' component={SignUp}/>
            <Route path='/reset-password/:token' component={ResetPassword}/>
            <Route path='*' component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default Simple;
