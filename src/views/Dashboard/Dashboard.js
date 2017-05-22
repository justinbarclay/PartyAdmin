import React, { Component } from 'react';
import Table from '../Table'

class Dashboard extends Component {

  render() {
    return (
    <div>
        <Table header={""} data={[1,2,3]} title={"Part"}/>
    </div>
    );
  }
}

export default Dashboard;
