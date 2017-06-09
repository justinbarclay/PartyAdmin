import React, { Component } from 'react'
import UnitContainer from './UnitContainer';
import partAction from '../../actions/parts';
import Alert from '../../components/Alert';

import { connect } from 'react-redux';
import { setAuthState } from '../../actions/auth';

class NewPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],
            alertClass: "",
            messages: []
        }

        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.newUnit = this.newUnit.bind(this);
        this.savePart = this.savePart.bind(this);
    }
    remove(index) {
        // Remove an item from the unit list
        let newUnits = this.state.units
        newUnits.splice(index, 1);
        this.setState({ units: newUnits });
    }
    update(unit, index) {
        console.log(unit);
        let newUnits = this.state.units;
        newUnits[index] = unit;
        this.setState({ units: newUnits });
    }
    newUnit(e) {
        e.preventDefault();
        let newUnits = this.state.units;
        newUnits.push("");
        this.setState({ units: newUnits });
    }
    savePart() {
        let name = document.getElementById('inputName').value;
        let location = document.getElementById('inputLocation').value;
        let shelf = document.getElementById('inputShelf').value;
        let count = document.getElementById('inputCount').value;
        let value = document.getElementById('inputValue').value;
        let barcode = document.getElementById('inputBarcode').value;

        let part = {
            name: name,
            location: location,
            shelf: shelf,
            count: count,
            value: value,
            units: this.state.units,
            barcode: barcode
        }

        partAction().save(part)
            .then((data) => {
                this.props.history.push("/");
            })
            .catch((error) => {
                if (error.status === 401) {
                    this.props.dispatch(setAuthState(false));
                }
                Promise.resolve(error.json()).then((data) => { console.log(data.errors); this.setState({ messages: data.errors, alertClass: "alert-danger" }) });
            });

    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Part
                </div>
                <Alert alertClass={this.state.alertClass} messages={this.state.messages} />
                <div className="container card-block">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputName" className="col-form-label">Name</label>
                            <input type="text" className="form-control" id="inputName" placeholder="Product name" />
                        </div>
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputLocation" className="col-form-label">Location</label>
                                <input type="text" className="form-control" id="inputLocation" placeholder="Room" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputShelf" className="col-form-label">Shelf</label>
                                <input type="text" className="form-control" id="inputShelf" placeholder="Shelf number" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-2">
                                <label htmlFor="inputCount" className="col-form-label">Count</label>
                                <input type="number" className="form-control" id="inputCount" />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputBarcode" className="col-form-label">Barcode</label>
                                <input type="number" className="form-control" id="inputBarcode" />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputValue" className="col-form-label">Current Value</label>
                                <input type="number" className="form-control" id="inputValue" />
                            </div>
                        </div>
                        <UnitContainer units={this.state.units} remove={this.remove} update={this.update} newUnit={this.newUnit} />
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary btn-md" onClick={this.savePart}>Save</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={this.resetPart}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}
NewPart = connect()(NewPart);
export default NewPart;