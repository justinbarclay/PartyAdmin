import React, { Component } from 'react'

class Table extends Component {
    render(){
        let rows = this.props.data.map(function(data, index){
            return (<TableRow data={data} key={index}/>);
        });
        return (
            <div>
              <div className="animated fadeIn">
                <div className="row">
                <div className="col-lg-11 col-sm-11">
                    <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." aria-label="Search for..."/>
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
                            <TableHeaders header={this.props.header}/>
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
    render(){
        let headers = ["Product", "Count", "Room", "Shelf", "Last Modified"];
        let thing = headers.map(function(header, index){
            return (<th key={index}>{header}</th>);
        });
        return(
            <tr>
                {thing}
            </tr>
        )
    }
}

class TableRow extends Component {
    render(){
        let data = ["Test", "Test", "Test", "Test", "January 11th"];
        let thing = data.map(function(data, index){
            return(
            <td key={index}>
                {data}
            </td>);
        });
        return(
            <tr>
                {thing}
            </tr>
        )
    }
}

export default Table;