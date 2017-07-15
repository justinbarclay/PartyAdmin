
import PrintTemplate from 'react-print';
import React from 'react';
import ReactDOM from 'react-dom';
import { QRCode } from 'react-qr-svg';

class QRCodePrinter extends React.Component {
  componentDidMount(){
    window.print();
  }
  componentDidUpdate(){
    window.print();
  }
  render() {
    let qrCodes = this.props.partIDs.map((value, index) =>{
      return <div key={index} className="m-2 d-inline-block"><QRCode value={value.toString()} size={305} /></div>;
    })
    return (
          <PrintTemplate>
             <div>
             {qrCodes}
             </div>
           </PrintTemplate>
       )
  }
}


let printQRCode = (values) => {
  ReactDOM.render(
  <QRCodePrinter partIDs={values} />, document.getElementById('print-mount')
);
}
export default printQRCode;
