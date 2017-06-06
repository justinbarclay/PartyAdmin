import React, { Component } from 'react';
import Table from '../Table';
import adminAction from '../../actions/admin';

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

    getUsers((data) => {
      const users = data.users;
      self.setState({ users: users });
    });
  }
  render() {
    return (
      <div>
        <Table header={this.state.headers} data={this.state.users} keys={this.state.keys} title={"Users"} handleClick={this.rowOnClick} baseRoute={"users"}/>
      </div>  
    );
  }
}
function getUsers(callback){
    adminAction()
    .index()
    .then(callback)
    .catch((error) =>{
      console.log(error);
    });
}

//Users = withRouter(Users);
export default Users;
