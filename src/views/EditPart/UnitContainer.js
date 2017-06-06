import React, { Component } from 'react'

class UnitContainer extends Component {
    constructor(props) {
        super(props);
        // Bind this to all functions
        this.makeRows = this.makeRows.bind(this);
    }
    makeRows(units) {
        let row = [];
        let rows = [];
        // Map each unit name to an row of max length 4
        for (let i = 0; i < units.length; ++i) {
            row.push(unitInput(units[i], i, this.props.remove, this.props.update));
            if (i % 4 === 3) {
                rows.push(row);
                row = [];
            }
        }

        // If row still has atleast one element in it, push it into rows
        if (row.length > 0) {
            rows.push(row);
        }

        return rows;
    }
    render() {
        let rows = this.makeRows(this.props.units);
        return (
            <div className="card">
                <div className="card-header">
                    Units
                <button className="btn btn-sm btn-primary float-right" onClick={this.props.newUnit}>Add</button>
                </div>
                <div className="card-block">
                    <div className="row">
                        {rows}
                    </div>
                </div>
            </div>
        );
    }
}

function unitInput(unit, index, remove, update) {
    function updateElement(event) {
        update(event.target.value, index);
    }
    function deleteElement() {
        remove(index);
    }
    return (
        <div className="form-group col-md-3">
            <div className="input-group">
                <input className="form-control" placeholder="Unit name" value={unit.name} onChange={updateElement} />
                <span className="input-group-btn">
                    <button type="button" className="btn btn-secondary" aria-label="Close" onClick={deleteElement}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </span>
            </div>
        </div>
    );
}

export default UnitContainer;