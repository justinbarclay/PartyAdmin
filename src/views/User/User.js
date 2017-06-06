import React, { Component } from 'react';
import adminActions from '../../actions/admin';
import { Link } from 'react-router-dom';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} }
    }
    componentWillMount() {
        let self = this;
        adminActions()
            .get(this.props.match.params.id)
            .then((data) => {
                self.setState({ user: data.user });
            })
            .catch((error) => { console.log(error) });
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
                        <dt htmlFor="email" className="col-sm-1">Email:</dt>
                        <dd id="email" className="col-sm-10"></dd>
                    </div>
                    <div className="form-group row">
                        <dt className="col-sm-2">First Name:</dt>
                        <dd className="col-sm-4" id="firstName"></dd>
                    </div>
                    <div className="form-group row">
                        <dt className="col-sm-2">Last Name:</dt>
                        <dd className="col-sm-4" id="lastName"></dd>
                    </div>
                    <div className="btn-group" role="group">
                        <Link to={`/users/${this.props.match.params.id}/edit`} className="btn btn-primary btn-md" >Edit</Link>
                        <Link to={`/users/${this.props.match.params.id}/edit`} className="btn btn-primary btn-md" >Reset Password</Link>
                    </div>
                </div>
            </div>

        );
    }
}

export default User;