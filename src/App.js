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
        let thing = this.app
        return (thing);
    }
}

export default App;