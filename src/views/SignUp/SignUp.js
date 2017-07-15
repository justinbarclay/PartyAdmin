import React, { Component } from 'react';
import Alert from '../../components/Alert';
import userActions from '../../actions/user';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            alertClass: "",
            messages: []
        }
        this.signup = this.signup.bind(this);
    }
    componentWillMount() {

        userActions().get(this.props.match.params.token)
            .then((data) => {
                this.setState({ user: data.user });
            })
            .catch((error) => {

            });
    }
    signup() {
        let password = document.getElementById('password').value;
        let confirmation = document.getElementById('confirmation').value;
        if (password === confirmation && password.length > 6) {
            let user = {
                password: password,
                password_confirmation: confirmation,
                invite_token: this.props.match.params.token
            }
            userActions().signup(user)
                .then((data) => {
                    this.props.history.push("/");
                })
                .catch((error) => {
                    Promise.resolve(error.json()).then((data) => { this.setState({ messages: data.errors, alertClass: "alert-danger" }) });
                });
        } else {
            this.setState({ messages: ["Passwords do not match"], alertClass: "alert-danger" });
        }

    }
    componentWillUpdate(nextProps, nextState) {
        document.getElementById('email1').innerText = nextState.user.email;
        document.getElementById('firstName').innerText += " " + nextState.user.first_name;
        document.getElementById('lastName').innerText += " " + nextState.user.last_name;
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Sign Up
                    </div>
                    <Alert alertClass={this.state.alertClass} messages={this.state.messages} />
                    <div className="card-block">
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <dd id="email1"> </dd>
                        </div>
                        <div className="form-group">
                            <label>First Name: </label>
                            <dd id="firstName"></dd>
                        </div>
                        <div className="form-group ">
                            <label>Last Name: </label>
                            <dd id="lastName"></dd>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-1">Password:</label>
                            <input type="password" className="col-lg-5" id="password" placeholder="Password" />
                            <label className="col-md-1">Confirm:</label>
                            <input type="password" className="col-lg-5" id="confirmation" placeholder="Confirm Password" />
                        </div>
                        <div className="btn-group" role="group">
                            <div onClick={this.signup} className="btn btn-primary btn-md" >Register</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
