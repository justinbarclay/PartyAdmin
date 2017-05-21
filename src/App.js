import React, { Component } from 'react';
import  Full from './containers/Full';
import  Simple from './containers/Simple';

class App extends Component {
    constructor(){
        super();
        this.app = <Simple/>;
        if(window.localStorage){
            this.app = <Full/>;
        }
    }
    render(){
        return (this.app);
    }
}

export default App;