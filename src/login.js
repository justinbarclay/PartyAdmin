import React, {
  Component
} from 'react';
import './login.css';
import 'superagent'

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(e){
    if(e.key == 'Enter'){
      this.login();
    }
  }
  login() {
    let self = this;
    const email = this.email.value;
    const password = this.password.value;

    if (email == "" || password == ""){
      alert('Email or password can not be blank');
      return;
    }
    
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
    .then(parseJSON)
    .then(function(data) {
      console.log(data);
      if(data.jwt){
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('jwt', data.jwt);
        self.props.callback(true);
      }
      return;
    })
    .catch(function(error) {
      alert("username and password do not match");
      console.log('request failed', error);
    })
  }
  render() {
    let self = this;
    return ( 
      <div className="login">
        <div className="loginText"> Login {console.log(this)} </div> 
        <input className="baseInput" placeholder="Email" ref={(email) => { this.email = email; }}/>
        <input type="password" className="baseInput" placeholder="Password" onKeyPress={this.submit} ref={(password) => { this.password = password; }}/>
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