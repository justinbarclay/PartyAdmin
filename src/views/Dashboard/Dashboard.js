import React, { Component } from 'react';
import Table from '../Table'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {headers: ["Name", "Count", "Room", "Shelf", "Updated At"], parts: [], keys: ["name", "count", "room", "shelf", "updated_at"]}
  }
  componentWillMount(){
    let token = `Bearer ${window.localStorage.getItem('jwt')}`;
    let self = this;

    getParts(token, (data) => {
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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}
function getParts(token, callback){
    fetch('//www.partyserver.dev/api/parts', {
      headers: new Headers({
        'Authorization': token,
		    'Content-Type': 'application/json',
        'Accept': 'application/json',
	    }),
      method: 'GET',
      mode: 'cors',
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback)
    .catch(function(error) {
      console.log('request failed', error);
    });
}
export default Dashboard;
