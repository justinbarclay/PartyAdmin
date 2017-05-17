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
    .then(test)
    .then(function(data) {
      console.log('request succeeded with JSON response', data)
    })
    .catch(function(error) {
      console.log('request failed', error);
    })
  }
  render() {
    let self = this;
    return ( 
      <div className="login">
        <div className="loginText"> Login </div> 
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
function test(response){ 
      let jwt = response.json();
      alert(JSON.stringify(jwt)); 
      return jwt;
}

function parseJSON(response) {
  return response.json()
}

export default Login;