import React, { Component } from 'react';
import * as moment from 'moment';

class Table extends Component {
    render() {
        let keys = this.props.keys;
        let rows = this.props.data.map(function (data, index) {
            return (<TableRow data={data} key={index} keys={keys} />);
        });
        return (
            <div>
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-lg-11 col-sm-11">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..." />
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary" type="button">Go!</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-lg-11 col-sm-11">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> {this.props.title}
                                </div>
                                <div className="card-block">
                                    <table className="table table-striped table-inverse table-hover">
                                        <tbody>
                                            <TableHeaders headers={this.props.header} />
                                            {rows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class TableHeaders extends Component {
    render() {
        let headers = this.props.headers.map(function (header, index) {
            return (<th key={index}>{header}</th>);
        });
        return (
            <tr>
                {headers}
            </tr>
        )
    }
}

class TableRow extends Component {
    moment = moment;
    render() {
        let data = this.props.data;
        let row = this.props.keys.map(function (key, index) {
            if (key === "updated_at") {
                let date = data[key];
                date = moment.default(date).format('DD-MM-YYYY');
                return(
                <td key={index}>
                    {date}
                </td>);
            }
            return (

                <td key={index}>
                    {data[key]}
                </td>);
        });
        return (
            <tr>
                {row}
            </tr>
        )
    }
}

export default Table;