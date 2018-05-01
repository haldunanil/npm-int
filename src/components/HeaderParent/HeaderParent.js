import React, { Component } from "react";
import "./HeaderParent.css";
import { Container } from "reactstrap";

class HeaderParent extends Component {
  render() {
    return (
      <div
        className="Header-parent"
        style={{ backgroundImage: `url(${this.props.backgroundImage})` }}
      >
        <Container className="Header-content">
          <h1>{this.props.headline}</h1>
          <span>
            You currently have{" "}
            <strong>
              {this.props.numRsusAvail.toLocaleString(navigator.language, {
                minimumFractionDigits: 0
              })}
            </strong>{" "}
            newly vested RSUs.
          </span>
          <p className="Header-explanation" style={{ paddingTop: "20px" }}>
            You must pay taxes on these RSUs regardless of whether you convert them into shares or cash out. Read below to see the different options for paying them.
          </p>
        </Container>
      </div>
    );
  }
}

export default HeaderParent;
