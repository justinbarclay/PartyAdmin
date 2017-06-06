import React, { Component } from 'react';
import  Full from './containers/Full';
import  Simple from './containers/Simple';

class App extends Component {
    constructor(props){
        super(props);
        this.authStateChange = this.authStateChange.bind(this);
        this.state  = {"auth": window.localStorage.getItem('jwt') ? true : false};
        this.app = (this.state.auth ? <Full logout={this.authStateChange}/> : <Simple login={this.authStateChange}/>);
    }
    componentWillUpdate(nextProps, nextState){
        //This is a really hacky way to choose which component to render
        // It might be worthwhile to split it out to multiple lines
        this.app = (nextState.auth ? <Full logout={this.authStateChange}/>: <Simple login={this.authStateChange}/>);
    }
    authStateChange(){
        this.setState({auth: window.localStorage.getItem('jwt') ? true : false});
    }
    render(){
        return (this.app);
    }
}

export default App;
