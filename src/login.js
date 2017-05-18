import React, {
  Component
} from 'react';
import './login.css';
import 'superagent'

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }
  login() {
    const email = this.email.value;
    const password = this.password.value;
    this.props.callback(true);
    console.log(JSON.stringify({auth:{
         email: email,
        password: password
      }}));
    
    fetch('//www.partyserver.dev/user_token', {
      headers: new Headers({
		    'Content-Type': 'application/json',
        'Accept': 'application/json',
	    }),
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({auth:{
         email: email,
        password: password
      }})
    })
    .then(checkStatus)
    .then(function(data) {
      if(data.jwt){
        window.localStorage.setItem('email', email);
        window.localStorage.setItemt('jwt', data.jwt);
      }      
    })
    .catch(function(error) {
      console.log('request failed', error);
    })
  }
  render() {
    let self = this;
    return ( 
      <div className="login">
        <div className="loginText"> Login {console.log(this)} </div> 
        <input className="baseInput" placeholder="Email" ref={(email) => { this.email = email; }}/>
        <input type="password" className="baseInput" placeholder="Password" ref={(password) => { this.password = password; }}/>
        <button className="btn btn-1 btn-1b"onClick={self.login}> Submit </button> 
      </div>
    );
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

export default Login;