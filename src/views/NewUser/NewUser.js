import React, { Component } from 'react';
import adminActions from '../../actions/admin';
import Alert from '../../components/Alert';

class User extends Component {
    constructor(props) {
        super(props);
        console.log(this);
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
        }
        adminActions().invite(user)
            .then((data) => {
                this.props.history.push("/users");
            })
            .catch((error) => {
                // This is a hacky way of being able to resolve an error while still reading it's body
                if(error.status === 501){
                    this.props.history.push("/");   
                }
                Promise.resolve(error.json()).then((data) => { this.setState({ messages: data.errors, alertClass: "alert-danger" }) });
            });
    }
    componentWillUpdate(nextProps, nextState) {
        document.getElementById('email').innerText = nextState.user.email;
        document.getElementById('firstName').innerText = nextState.user.first_name;
        document.getElementById('lastName').innerText = nextState.user.last_name;
    }
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