import React, { Component } from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
class Table extends Component {
    render() {
        let handleClick = this.props.handleClick;
        let keys = this.props.keys;
        let rows = this.props.data.map(function (data, index) {
            return (<TableRow data={data} key={index} keys={keys} handleClick={handleClick}/>);
        });
        return (
            <div>
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-11">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> {this.props.title}
                                    <Link to={`${this.props.baseRoute}/new`} className="btn btn-sm btn-primary float-right">Add</Link>
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
        );
    }
}

class TableHeaders extends Component {
    render() {
        let headers = this.props.headers.map(function (header, index) {
            let styles = "";
            if (header !== "email") {
                styles = "tableColumn";
            }
            return (<th key={index} className={styles}>{header}</th>);
        });
        return (
            <tr>
                {headers}
            </tr>
        );
    }
}

class TableRow extends Component {
    constructor(props, history) {
        super(props);
        this.loadPart = this.loadPart.bind(this);
    }
    loadPart() {
        this.props.handleClick(this.props.data.id);
    }
    render() {
        let data = this.props.data;
        let row = this.props.keys.map(function (key, index) {
            let styles = "";
            if (key !== "email") {
                styles = "tableColumn";
            }
            if (key === "updated_at") {
                let date = data[key];
                date = moment.default(date).format('DD/MM/YYYY');
                return (
                    <td className={styles} key={index}>
                        {date}
                    </td>);
            }
            return (

                <td className={styles} key={index}>
                    {data[key]}
                </td>
            );
        });
        return (
            <tr onClick={this.loadPart}>
                {row}
            </tr>
        );
    }
}

export default Table;
