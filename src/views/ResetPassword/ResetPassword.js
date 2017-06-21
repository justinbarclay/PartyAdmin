import React, { Component } from 'react';
import Alert from '../../components/Alert';
import userActions from '../../actions/user';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            alertClass: "",
            messages: []
        }
        this.resetPassword = this.resetPassword.bind(this);
    }
    componentWillMount() {

        userActions().get(this.props.match.params.token)
            .then((data) => {
                this.setState({ user: data.user });
            })
            .catch((error) => {

            });
    }
    resetPassword() {
        let password = document.getElementById('password').value;
        let confirmation = document.getElementById('confirmation').value;
        if (password === confirmation && password.length > 6) {
            let user = {
                password: password,
                password_confirmation: confirmation,
                reset_token: this.props.match.params.token
            }
            userActions().signup(user)
                .then((data) => {
                    this.setState({ messages: ["Password was reset"], alertClass: "alert-success" });
                })
                .catch((error) => {
                    Promise.resolve(error.json()).then((data) => { console.log(data.errors); this.setState({ messages: data.errors, alertClass: "alert-danger" }) });
                });
        } else {
            this.setState({messages: ["Passwords do not match"], alertClass: "alert-danger"});
        }

    }
    componentWillUpdate(nextProps, nextState) {
        document.getElementById('email').innerText += " " + nextState.user.email;
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Reset Password
                    </div>
                    <Alert alertClass={this.state.alertClass} messages={this.state.messages} />
                    <div className="card-block">
                        <div className="form-group row">
                            <dd className="col-md-4" id="email">Email: </dd>
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

export default ResetPassword;
