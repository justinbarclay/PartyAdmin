import React, { Component } from 'react';
import Table from '../PartsTable';
import { connect } from 'react-redux';
import {setAuthState} from '../../actions/auth'; 
import partAction from '../../actions/parts';
import QRCodePrinter from '../QRCodePrinter';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.rowOnClick = this.rowOnClick.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.state = { headers: [" ", "Name", "Count", "Room", "Shelf", "Updated"], parts: [], keys: ["name", "count", "room", "shelf", "updated_at"] }
  }
  componentWillMount() {
    partAction()
    .index()
    .then((data) => {
      const parts = data.parts;
      this.setState({ parts: parts });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  rowOnClick(id) {
    this.props.history.push(`/parts/${id}`);
  }
  searchFor(term) {
    let type = "part";
    let typeSelector = document.querySelector('input[name="optionsRadios"]:checked');
    if( typeSelector !== null){
      type = typeSelector.value;
    }
    partAction().search({ query_term: term, type: type })
    .then((data) => {
      this.setState({parts: data.parts});
    })
    .catch((error) => {
      if(error.status === 401){
            this.props.dispatch(setAuthState(false));
      }
    });
  }
  keyUp(e){
    e.preventDefault();
  }
  hideOptions(){
    console.log(document.getElementById('options'))
    document.getElementById('options').className = "form-group collapse"
  }
  render() {
    return (
      <div>
        <SearchBar handleClick={this.searchFor}>
          <fieldset data-toggle="true" className="form-group collapse" aria-expanded="false" id="options" onBlur={this.hideOptions}>
            <div className="form-check">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optionsRadios" id="optionPart" defaultChecked={true} value="part" default={true}/>
                By Part
            </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optionsRadios" id="optionUnit" value="unit" />
                By Unit
          </label>
            </div>
          </fieldset>
        </SearchBar>
        <Table header={this.state.headers} data={this.state.parts} keys={this.state.keys} title={"Part"} onKeyUp={this.keyUp} handleClick={this.rowOnClick} baseRoute={"parts"} />
      </div>
    );
  }
}



class SearchBar extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    let data = document.getElementById("search").value
    this.props.handleClick(data)
  }
  showOptions(){
    console.log(document.getElementById('options'))
    document.getElementById('options').className = "form-group collapse.show"
  }
  
  render() {
    return (
      <div className="animated fadeIn" onFocus={this.showOptions}>
        <div className="row">
          <div className="col-sm-11">
            <div className="input-group">
              <input type="text" className="form-control" id="search" placeholder="Search for..." aria-label="Search for..."/>
              <span className="input-group-btn">
                <button className="btn btn-secondary" onClick={this.handleClick} type="button">Go!</button>
              </span>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}


export default connect()(Dashboard);
