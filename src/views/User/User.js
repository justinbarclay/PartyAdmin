import React, { Component } from 'react';
import adminActions from '../../actions/admin';
import Alert from '../../components/Alert';
import { Link } from 'react-router-dom';

import { setAuthState } from '../../actions/auth';

class User extends Component {
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
        let self = this;
        adminActions()
            .get(this.props.match.params.id)
            .then((data) => {
                self.setState({ user: data.user });
            })
            .catch((error) => {
                if (error.status === 401) {
                    this.props.dispatch(setAuthState(false));
                }
                Promise.resolve(error.json()).then((data) => { console.log(data.errors); this.setState({ messages: data.errors, alertClass: "alert-danger" }) });

            });
    }
    componentWillUpdate(nextProps, nextState) {
        document.getElementById('email').innerText = nextState.user.email;
        document.getElementById('firstName').innerText = nextState.user.first_name;
        document.getElementById('lastName').innerText = nextState.user.last_name;
    }
    resetPassword() {
        adminActions()
            .resetPassword(this.state.user)
            .then((data) => {
                this.setState({ messages: ["User has been set a password reset email"], alertClass: "alert-success" })
            })
            .catch((error) => {
                if (error.status === 401) {
                    this.props.dispatch(setAuthState(false));
                }
                Promise.resolve(error.json()).then((data) => { console.log(data.errors); this.setState({ messages: data.errors, alertClass: "alert-danger" }) });

            });
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Part
                </div>
                <Alert alertClass={this.state.alertClass} messages={this.state.messages} />
                <div className="container card-block">
                    <div className="form-group row">
                        <dt htmlFor="email" className="col-sm-2 text-sm-right">Email:</dt>
                        <dd id="email" className="col-sm-8"></dd>
                    </div>
                    <div className="form-group row mb-1 text-sm-right">
                        <dt className="col-sm-2 text-sm-right">First Name:</dt>
                        <dd className="col-sm-4 text-sm-left" id="firstName"></dd>
                    </div>
                    <div className="form-group row">
                        <dt className="col-sm-2 text-sm-right">Last Name:</dt>
                        <dd className="col-sm-4 text-sm-left" id="lastName"></dd>
                    </div>
                    <div className="btn-group row" role="group" disabled={true}>
                        <Link to={`/users/${this.props.match.params.id}/edit`} className="btn btn-primary btn-md mr-1" >Edit</Link>
                        <button className="btn btn-primary btn-md" onClick={this.resetPassword} >Reset Password</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default User;