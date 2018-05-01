import React, { Component } from "react";
import "./Details.css";
import { Container } from "reactstrap";

class Details extends Component {
  render() {
    return (
      <Container
        className={
          "Details-bubble Details-bubble-" +
          (this.props.side ? this.props.side : 'left')
        }
      >
        <Container className="Details-content">
          {this.props.children}
        </Container>
      </Container>
    );
  }
}

export default Details;
