import React, { Component } from 'react';
import userActions from '../../actions/user';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} }
        this.signup = this.signup.bind(this);
    }
    componentWillMount() {
        console.log(this.props.match.params.token);
        userActions().get(this.props.match.params.token)
            .then((data) => {
                this.setState({ user: data.user });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    signup() {
       let password = document.getElementById('password').value;
       let  confirmation = document.getElementById('confirmation').value;
        if (password === confirmation && password.length > 6) {
            let user = {
                password: password,
                password_confirmation: confirmation,
                invite_token: this.props.match.params.token
        }
            userActions().signup(user)
            .then((data)=>{
                alert(JSON.stringify(data))
            })
            .catch((error) =>{
                alert(error);
            });
        } else {
            alert("Failure");
        }
        
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextState.user);
        document.getElementById('email').innerText += " " + nextState.user.email;
        document.getElementById('firstName').innerText += " " + nextState.user.first_name;
        document.getElementById('lastName').innerText += " " + nextState.user.last_name;
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    User
                </div>
                <div className="container card-block">
                    <div className="form-group row">
                        <dd className="col-md-4" id="email">Email: </dd>
                    </div>
                    <div className="form-group row">
                        <dd className="col-md-4" id="firstName">First Name: </dd>
                    </div>
                    <div className="form-group row">
                        <dd className="col-md-4" id="lastName">Last Name:</dd>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-1">Password:</label>
                        <input type="password" className="col-md-5" id="password" placeholder="Password" />
                        <label className="col-md-1">Confirm:</label>
                        <input type="password" className="col-md-5" id="confirmation" placeholder="Confirm Password" />
                    </div>
                    <div className="btn-group" role="group">
                        <div onClick={this.signup} className="btn btn-primary btn-md" >SignUp!</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default User;
