import React, { Component } from 'react';

class Dashboard extends Component {

  render() {
    return (
      <div>
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-11">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..."/>
              <span class="input-group-btn">
                <button className="btn btn-secondary" type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-11">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Parts
              </div>
              <div className="card-block">
              <table className="table table-striped table-inverse table-hover table-responsive">
                <tr>
                  <th>Product</th>
                  <th>Count</th>
                  <th>Room</th>
                  <th>Shelf</th>
                  <th>Last Modified</th>
                </tr>
                <tbody>
                <tr>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>January 11th</td>
                </tr>
                <tr>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>January 11th</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default Dashboard;
