import React, { Component } from 'react'
import UnitContainer from './UnitContainer';

class Part extends Component {
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
                                <input type="number" className="htmlForm-control" id="inputCount"   />
                            </div>
                        </div>
                        <UnitContainer/>
                        <button type="save" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Part;