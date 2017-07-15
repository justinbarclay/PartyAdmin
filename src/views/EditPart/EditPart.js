import React, { Component } from 'react';
import UnitContainer from './UnitContainer';
import partAction from '../../actions/parts';

import { setAuthState } from '../../actions/auth';

class EditPart extends Component {
    constructor(props) {
        super(props);
        this.state = { units: [] }

        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.newUnit = this.newUnit.bind(this);
        this.savePart = this.savePart.bind(this);
        this.deletePart = this.deletePart.bind(this);
    }
    componentWillMount() {
        let self = this;
        partAction()
            .get(this.props.match.params.id)
            .then((data) => {
                self.setState({
                    part: data.part,
                    units: data.part.units
                });
            })
            .catch((error) => {
                if (error.status === 401) {
                    this.props.dispatch(setAuthState(false));
                }
                Promise.resolve(error.json()).then((data) => { this.setState({ messages: data.errors, alertClass: "alert-danger" }) });
            });
    }
    componentWillUpdate(nextProps, nextState) {
        document.getElementById('inputName').value = nextState.part.name;
        document.getElementById('inputLocation').value = nextState.part.room;
        document.getElementById('inputShelf').value = nextState.part.shelf;
        document.getElementById('inputCount').value = nextState.part.count;
        document.getElementById('inputValue').value = nextState.part.value ? nextState.part.value : "";
        document.getElementById('inputBarcode').value = nextState.part.barcode ? nextState.part.barcode : "  ";
    }
    remove(index) {
        // Remove an item from the unit list
        let newUnits = this.state.units
        newUnits.splice(index, 1);
        this.setState({ units: newUnits });
    }
    update(unit, index) {
        let newUnits = this.state.units;
        newUnits[index] = { name: unit };
        this.setState({ units: newUnits });
    }
    newUnit(e) {
        e.preventDefault();
        let newUnits = this.state.units;
        newUnits.push({ name: "" });
        this.setState({ units: newUnits });
    }
    savePart() {
        let part = {
            id: this.props.match.params.id,
            name: document.getElementById('inputName').value,
            location: document.getElementById('inputLocation').value,
            shelf: document.getElementById('inputShelf').value,
            count: document.getElementById('inputCount').value,
            value: document.getElementById('inputValue').value,
            units: this.state.units,
            barcode: document.getElementById('inputBarcode').value
        }

        partAction().update(part)
            .then((success) => {
                this.props.history.push("/");
            })
            .catch((error) => {
            });
    }
    deletePart() {
        partAction().delete(this.props.match.params.id)
            .then((success) => {
                this.props.history.push("/");
            })
            .catch((error) => {
                console.error(error);
            })
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Part
                </div>
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
                                <label htmlFor="inputValue" className="col-form-label">Value (per unit)</label>
                                <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div className="input-group-addon">$</div>
                                    <input type="number" className="form-control" id="inputValue" />
                                </div>
                            </div>
                        </div>
                        <UnitContainer units={this.state.units} remove={this.remove} update={this.update} newUnit={this.newUnit} />
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary btn-md mr-1" onClick={this.savePart}>Save</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={this.deletePart}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default EditPart;