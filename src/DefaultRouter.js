import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

// import Simple from './containers/Simple/'

import Dashboard from './views/Dashboard/'

class DefaultRouter extends Component {
  render(){
    return (
   
      <Route exactly path="/" name="Home" component={Dashboard}/>
    );
  }
}
