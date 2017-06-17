import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setAuthState} from '../../../actions/auth'
import 'superagent'

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(e){
    if(e.key === 'Enter'){
      this.login();
    }
  }
  login(e) {

    const email = this.email.value;
    const password = this.password.value;

    if (email.length < 1 || password.length < 1){
      alert('Email or password can not be blank');
      return;
    }
    loginRequest({email: email, password: password}, (success)=>{
      this.props.dispatch(setAuthState(success));
    });
    document.getElementById('login').disabled = true;
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group mb-0">
              <div className="card p-4">
                <div className="card-block">
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input type="text" className="form-control" placeholder="Username" ref={(email) => { this.email = email; }} />
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Password" onKeyPress={this.submit} ref={(password) => { this.password = password; }}/>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button type="button" className="btn btn-primary px-4" id="login" onClick={this.login}>Login</button>
                    </div>
                    <div className="col-6 text-right">
                      <button type="button" className="btn btn-link px-0">Forgot password?</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

function loginRequest(user, callback){
    fetch('//www.partyserver.dev/user_token', {
      headers: new Headers({
		    'Content-Type': 'application/json',
        'Accept': 'application/json',
	    }),
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({auth:{
         email: user.email,
        password: user.password
      }})
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      if(data.jwt){
        window.localStorage.setItem('email', user.email);
        window.localStorage.setItem('jwt', data.jwt);
        callback(true);
      } else {
        throw new Error("Response missing JWT")
      }
    })
    .catch(function(error) {
      document.getElementById('login').disabled = false;
      alert("username and password do not match");
    });
}
Login = connect()(Login);
export default Login;
