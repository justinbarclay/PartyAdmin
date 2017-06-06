import React, { Component } from 'react';
import Table from '../Table';
import userAction from '../../actions/users';

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

    getParts((data) => {
      const users = data.users;
      self.setState({ users: users });
    });
  }
  render() {
    return (
      <div>
        <Table header={this.state.headers} data={this.state.users} keys={this.state.keys} title={"Users"} handleClick={this.rowOnClick} />
      </div>  
    );
  }
}
function getParts(callback){
    userAction()
    .index()
    .then(callback)
    .catch((error) =>{
      console.log(error);
    });
}

//Users = withRouter(Users);
export default Users;
