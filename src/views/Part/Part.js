import React, { Component } from 'react'
import UnitContainer from './UnitContainer';

class Part extends Component {
    constructor(props) {
        super(props);
        this.state = { units: [] }

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
        console.log(this.state.units);
        let name = document.getElementById('inputName');
        let location = document.getElementById('inputLocation');
        let shelf = document.getElementById('inputShelf');
        let count = document.getElementById('inputCount');
        let value = document.getElementById('inputValue');
        let barcode = document.getElementById('inputBarcode');
        
        let part = {
            name: name,
            location: location,
            shelf: shelf,
            count: count,
            value: value,
            barcode: barcode
        }

        newPart(window.localStorage.getItem('jwt'), part, (data)=>{
            console.log(data);
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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function newPart(token, part, callback){
    fetch('//www.partyserver.dev/api/parts', {
      headers: new Headers({
        'Authorization': token,
		    'Content-Type': 'application/json',
        'Accept': 'application/json',
	    }),
      method: 'POST',
      mode: 'cors',
      body: {
          part: part
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback)
    .catch(function(error) {
      console.log('request failed', error);
    });
}
export default Part;