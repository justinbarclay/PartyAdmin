import React, { Component } from 'react';
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
    loginRequest(this.props.callback);
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
                    <input type="text" className="form-control" placeholder="Username"/>
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Password"/>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button type="button" className="btn btn-primary px-4">Login</button>
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

function loginRequest(callback){
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

export default Login;
