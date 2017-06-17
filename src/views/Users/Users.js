import React, { Component } from 'react';
import Table from '../Table';
import adminAction from '../../actions/admin';
import { connect } from 'react-redux';
import {setAuthState} from '../../actions/auth'; 

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {headers: ["Email", "First Name", "Last Name", "Updated"], users: [], keys: ["email", "first_name", "last_name", "updated_at"]}
    this.rowOnClick = this.rowOnClick.bind(this);
  }
  rowOnClick(id){
    this.props.history.push(`/users/${id}`);
  }
  componentWillMount(){
    let self = this;
    adminAction().index()
    .then((data) => {
      const users = data.users;
      self.setState({ users: users });
    })
    .catch((error) =>{
      if(error.status === 401){
        this.props.dispatch(setAuthState(false));
      }
    });
    getUsers();
  }
  render() {
    return (
      <div>
        <SearchBar/>
        <Table header={this.state.headers} data={this.state.users} keys={this.state.keys} title={"Users"} handleClick={this.rowOnClick} baseRoute={"users"}/>
      </div>  
    );
  }
}

class SearchBar extends Component {
    render() {
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-sm-11">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..." />
                            <span className="input-group-btn">
                                <button className="btn btn-secondary" type="button">Go!</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function getUsers(callback){
    
}

//Users = withRouter(Users);
export default connect()(Users);
