import React, { Component } from 'react';
import Table from '../Table';
import partAction from '../../actions/parts';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {headers: ["Name", "Count", "Room", "Shelf", "Updated"], parts: [], keys: ["name", "count", "room", "shelf", "updated_at"]}
  }
  componentWillMount(){
    let self = this;

    getParts((data) => {
      const parts = data.parts;
      self.setState({ parts: parts });
    });
  }
  render() {
    return (
      <div>
        <Table header={this.state.headers} data={this.state.parts} keys={this.state.keys} title={"Part"} />
      </div>  
    );
  }
}
function getParts(callback){
    partAction()
    .index()
    .then(callback)
    .catch((error) =>{
      console.log(error);
    });
}
export default Dashboard;
