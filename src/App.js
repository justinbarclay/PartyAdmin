import React, { Component } from 'react';
import './App.css';
import Login from './login.js';
import Header from './header.js';
import LandingPage from './landingPage.js'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  constructor(){
    super();
    this.state = {loggedIn: false};
    this.login = this.login.bind(this);
  }
  login(success){
    this.setState({loggedIn: success})  
  }
  componentWillMount(){
  /*
  *
  *  This is bad form and the routes need to be moved off to their own config files.
  *  The question then becomes how do we update loggedIn? Do we need a data store?
  *
  */
    const loggedOut = (
        <Router>
          <div className="bodyContainer">
            <Route exact path="/" render={()=> (
                <Login callback={this.login}/>
            )
            }/>
          </div>
        </Router>
        );
    const loggedIn = (
        <Router>
          <div className="bodyContainer">
            <Route exact path="/" component={LandingPage}/>
          </div>
        </Router>
        );
    
    this.router = this.state.loggedIn? loggedIn : loggedOut;
  }
  componentWillUpdate(nextProps, nextState){
    let self = this;
    const loggedOut = (
        <Router>
          <div className="bodyContainer">
            <Route exact path="/" render={()=> (
                <Login callback={(success)=> {
                  console.log(success); 
                  self.setState({loggedIn: success})
                  }
                }/>
            )
            }/>
          </div>
        </Router>
        );
    const loggedIn = (
        <Router>
          <div className="bodyContainer">
            <Route exact path="/" component={LandingPage}/>
          </div>
        </Router>
        );
      this.router = nextState.loggedIn? loggedIn : loggedOut;
  }
  render() {
    return (
      <div className="App">
        <Header/>
        {this.router}
      </div>  
    );
  }
}

export default App;
