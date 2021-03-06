import React, { Component } from 'react';
import adminActions from '../../actions/admin';
import Alert from '../../components/Alert';
import { connect } from 'react-redux';
import { setAuthState } from '../../actions/auth';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            alertClass: "",
            messages: []
        };
        this.inviteUser = this.inviteUser.bind(this);
    }
    inviteUser() {
        let user = {
            email: document.getElementById('email').value,
            first_name: document.getElementById('firstName').value,
            last_name: document.getElementById('lastName').value,
            type: document.getElementById('type').value
        }
        console.log(document.getElementById('type').value);
        adminActions().invite(user)
            .then((data) => {
                this.props.history.push("/users");
            })
            .catch((error) => {
                if (error.status === 401) {
                    this.props.dispatch(setAuthState(false));
                }
                Promise.resolve(error.json()).then((data) => { this.setState({ messages: data.errors, alertClass: "alert-danger" }) });
            });
    }
    // componentWillUpdate(nextProps, nextState) {
    //     document.getElementById('email').innerText = nextState.user.email;
    //     document.getElementById('firstName').innerText = nextState.user.first_name;
    //     document.getElementById('lastName').innerText = nextState.user.last_name;
    // }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    New User
                </div>
                <Alert alertClass={this.state.alertClass} messages={this.state.messages} />
                <div className="container card-block">
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-1">Email:</label>
                        <input id="email" type="email" className="col-sm-4"></input>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">First Name:</label>
                        <input type="text" className="col-sm-4" id="firstName"></input>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">Last Name:</label>
                        <input type="text" className="col-sm-4" id="lastName"></input>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">Type:</label>
                        <select className="col-sm-4" id="type">
                            <option>User</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <div className="btn-group" role="group">
                        <div onClick={this.inviteUser} className="btn btn-primary btn-md" >Invite!</div>
                    </div>
                </div>
            </div>

        );
    }
}

User = connect()(User)
export default User;