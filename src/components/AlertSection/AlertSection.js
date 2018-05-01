import React, { Component } from "react";
import "./AlertSection.css";
import { Alert, Container } from "reactstrap";

class AlertSection extends Component {
  render() {
    return (
      <div>
        {this.props.data.sellingRsus.invalid ||
        this.props.data.taxRate.invalid ? (
          <Container style={{ paddingTop: 25 }}>
            {this.props.data.sellingRsus.invalid ? (
              <Alert color="danger">
                You can sell between 0-{this.props.calculators.makeNumberMoreReadable(
                  this.props.data.header.numRsusAvail
                )}{" "}
                RSUs.
              </Alert>
            ) : null}
            {this.props.data.taxRate.invalid ? (
              <Alert color="danger">
                Your tax rate must be between 0-100%.
              </Alert>
            ) : null}
          </Container>
        ) : null}{" "}
      </div>
    );
  }
}

export default AlertSection;
