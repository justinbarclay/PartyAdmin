import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';

import { createStore } from 'redux'
import partyApp from './reducers'

let store = createStore(partyApp)
let Wrapper = () => {
  return (
    <Router>
    <App store={store}/>
      </Router>
  )
}
ReactDOM.render(
  <Wrapper/>, document.getElementById('root')
);

