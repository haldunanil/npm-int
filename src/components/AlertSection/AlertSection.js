import React, { Component } from "react";
import "./AlertSection.css";
import { Alert, Container } from "reactstrap";

class AlertSection extends Component {
  makeRSUSaleAlert() {
    const maxRsus = this.props.calculators.makeNumberMoreReadable(
      this.props.data.header.numRsusAvail
    );

    switch (maxRsus) {
      case "0":
        return <Alert color="danger">You don't have any RSUs to sell.</Alert>;
      default:
        return (
          <Alert color="danger">You can sell between 0 and {maxRsus} RSUs.</Alert>
        );
    }
  }

  makeTaxRateAlert() {
    return <Alert color="danger">Your tax rate must be between 0 and 99%.</Alert>;
  }

  makeProcessingAlert() {
    return <Alert color="info">Your check is being processed.</Alert>;
  }

  render() {
    const displayAlerts =
      this.props.data.sellingRsus.invalid ||
      this.props.data.taxRate.invalid ||
      this.props.data.header.orderStatus;

    if (displayAlerts) {
      return (
        <Container style={{ paddingTop: 25 }}>
          {this.props.data.sellingRsus.invalid ? this.makeRSUSaleAlert() : null}
          {this.props.data.taxRate.invalid ? this.makeTaxRateAlert() : null}
          {this.props.data.header.orderStatus === "processing"
            ? this.makeProcessingAlert()
            : null}
        </Container>
      );
    }
    return null;
  }
}

export default AlertSection;
