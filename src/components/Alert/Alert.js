import React, { Component } from 'react';

class Alert extends Component {
  constructor(props){
    super(props);
    this.hideAlert = this.hideAlert.bind(this);
    this.hide = true
    this.alertClasses = "d-none";
  }
  hideAlert(){
    this.setState({hide: true });
  }
  componentWillReceiveProps(nextProps){
    this.setState({hide: false});
  }
  componentWillUpdate(nextProps, nextState){
    if(nextState.hide === true){
      this.alertClasses = "d-none";
    } else {
      this.alertClasses = "text-center alert " + nextProps.alertClass
    }
  }
  render() {
    let messages = this.props.messages.map((message, index)=>{
      return <div key={index}>{message}</div>
    });
    return (
      <div className={this.alertClasses} role="alert" onClick={this.hideAlert}>  
        {messages}
      </div>
    )
  }
}

export default Alert;
