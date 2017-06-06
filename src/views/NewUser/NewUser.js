import React, { Component } from 'react';
import adminActions from '../../actions/admin';
import { Link } from 'react-router-dom';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} }
    }
    inviteUser() {
        let user = {
            email: document.getElementById('email').value,
            first_name: document.getElementById('firstName').value,
            last_name: document.getElementById('lastName').value,
        }
        adminActions().invite(user)
            .then((data) => {
                alert(JSON.stringify(data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextState.part);
        document.getElementById('email').innerText = nextState.user.email;
        document.getElementById('firstName').innerText = nextState.user.first_name;
        document.getElementById('lastName').innerText = nextState.user.last_name;
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Part
                </div>
                <div className="container card-block">
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-1">Email:</label>
                        <input id="email" type="email" className="col-sm-10"></input>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">First Name:</label>
                        <input type="text" className="col-sm-4" id="firstName"></input>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">Last Name:</label>
                        <input type="text" className="col-sm-4" id="lastName"></input>
                    </div>
                    <div className="btn-group" role="group">
                        <div onClick={this.inviteUser} className="btn btn-primary btn-md" >Invite!</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default User;