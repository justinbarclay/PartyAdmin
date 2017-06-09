import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import  Full from './containers/Full';
import  Simple from './containers/Simple';
import { connect, Provider } from 'react-redux'

class App extends Component {
    constructor(props){
        super(props);
        this.authStateChange = this.authStateChange.bind(this);
        this.state  = {"auth": window.localStorage.getItem('jwt') ? true : false};
    }
    componentWillUpdate(nextProps, nextState){
        //This is a really hacky way to choose which component to render
        // It might be worthwhile to split it out to multiple lines
        
    }
    authStateChange(){
        this.setState({auth: window.localStorage.getItem('jwt') ? true : false});
    }
    render(){
        let signedout = (
                <Simple login={this.authStateChange}/>
            );

        let signedin = (
                <Full logout={this.authStateChange} store={this.props.store}/>
        );

        let app = this.state.auth ? signedin : signedout;
        console.log(this.props.store.getState())
        return (
            <Provider {...this.props}>
                {app}
            </Provider>);
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth.state
  }
}
App = withRouter(connect(mapStateToProps)(App));
export default App;
