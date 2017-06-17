import React, { Component } from 'react'
import UnitContainer from './UnitContainer';
import partAction from '../../actions/parts';
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert';

import { connect } from 'react-redux';
import { setAuthState } from '../../actions/auth';

class Part extends Component {
    constructor(props) {
        super(props);
        this.state = {
            part: {},
            alertClass: "",
            messages: []
        }
    }
    componentWillMount() {
        partAction()
            .get(this.props.match.params.id)
            .then((data) => {
                this.setState({ part: data.part });
            })
            .catch((error) => {
                if (error.status === 401) {
                    this.props.dispatch(setAuthState(false));
                }
                Promise.resolve(error.json()).then((data) => { console.log(data.errors); this.setState({ messages: data.errors, alertClass: "alert-danger" }) });
            });
    }
    componentWillUpdate(nextProps, nextState) {

        document.getElementById('inputName').innerText = nextState.part.name;
        document.getElementById('inputLocation').innerText = nextState.part.room;
        document.getElementById('inputShelf').innerText = nextState.part.shelf;
        document.getElementById('inputCount').innerText = nextState.part.count;
        document.getElementById('inputValue').innerText = nextState.part.value ? nextState.part.value : 0;
        document.getElementById('inputBarcode').innerText = nextState.part.barcode ? nextState.part.barcode : "  ";
    }
    render() {
        let Units = ""
        if (this.state.part.units) {
            Units = <UnitContainer units={this.state.part.units} remove={this.remove} update={this.update} newUnit={this.newUnit} />
        }
        return (
            <div className="card">
                <div className="card-header">
                    Part
                </div>
                <Alert alertClass={this.state.alertClass} messages={this.state.messages} />
                <div className="container card-block">
                    <form>
                        <div className="form-group row">
                            <dt htmlFor="inputName" className="col-sm-1">Name:</dt>
                            <dd id="inputName" className="col-sm-10" placeholder="Product name"></dd>
                        </div>
                        <div className="row">
                            <dt className="col-sm-1">Location:</dt>
                            <dd className="col-sm-4" id="inputLocation"></dd>
                            <dt className="col-sm-1">Shelf:</dt>
                            <dd className="col-sm-4" id="inputShelf"></dd>
                        </div>
                        <div className="row">
                            <dt className="col-1">Count:</dt>
                            <dd className="col-2" id="inputCount"></dd>
                            <dt className="col-1" title="value per unit">Value:</dt>
                            <dd className="col-2" id="inputValue"></dd>
                        </div>
                        <div className="row mb-3">
                            <dt className="col-1">Barcode:</dt>
                            <dd className="col-2" id="inputBarcode" ></dd>
                        </div>
                        {Units}
                        <div className="btn-group" role="group">
                            <Link to={`/parts/${this.props.match.params.id}/edit`} className="btn btn-primary btn-md" >Edit</Link>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default Part;