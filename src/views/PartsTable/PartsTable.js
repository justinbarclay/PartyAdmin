import React, { Component } from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import QRCodePrinter from '../QRCodePrinter';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: {} };
        this.openPrintDialog = this.openPrintDialog.bind(this);
        this.select = this.select.bind(this);
    }
    select(key, state) {
        let selected = this.state.selected;
        selected[key] = state;
        this.setState({ selected: selected })
        console.log(this.state.selected);
    }
    openPrintDialog() {
        let selected = [];
        let keys = Object.keys(this.state.selected);

        for (let i = 0; i < keys.length; i++) {
            let key = String(keys[i]);
            if (this.state.selected[key]) {
                selected.push(key);
            }
        }


        QRCodePrinter(selected);
    }
    render() {
        let handleClick = this.props.handleClick;
        let keys = this.props.keys;
        let rows = this.props.data.map((data, index) => {
            return (<TableRow data={data} key={index} keys={keys} handleClick={handleClick} select={this.select}/>);
        });
        return (
            <div>
                <div className="animated fadeIn">
                    <div className="row">
                        <div className="col-sm-11">
                            <div className="card">
                                <div className="card-header">
                                    <i className="fa fa-align-justify"></i> {this.props.title}
                                    <button onClick={this.openPrintDialog} className="btn btn-sm btn-primary float-right">Print</button>
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
            </div >
        );
    }
}

class TableHeaders extends Component {
    render() {
        let headers = this.props.headers.map(function (header, index) {
            let styles = "";
            if (header !== "Name" && header !== "Count") {
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
        this.select = this.select.bind(this);
    }
    loadPart() {
        this.props.handleClick(this.props.data.id);
    }
    select(e) {
        this.props.select(this.props.data.id, e.currentTarget.checked);
    }
    render() {
        let self = this;
        let data = this.props.data;
        let row = this.props.keys.map(function (key, index) {
            let styles = ""
            if (key !== "name" && key !== "count") {
                styles = "tableColumn";
            }

            if (key === "updated_at") {
                let date = data[key];
                date = moment.default(date).format('DD/MM/YYYY');
                return (
                    <td className="tableColumn" key={index} onClick={self.loadPart}>
                        {date}
                    </td>);
            }
            return (
                <td className={styles} key={index} onClick={self.loadPart}>
                    {data[key]}
                </td>
            );
        });
        return (
            <tr >
                <td className="tableColumn">
                    <input type="checkbox" aria-label="Checkbox for following text input" onClick={this.select} />
                </td>
                {row}
            </tr>
        );
    }
}

export default Table;
