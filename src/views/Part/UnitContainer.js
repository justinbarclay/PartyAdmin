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
            if (i % 12 === 11) {
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
    return (
        <div className="col-1">
            <div className="input-group">
                <div className="" value={unit.name}>{unit.name}</div>
            </div>
        </div>
    );
}

export default UnitContainer;