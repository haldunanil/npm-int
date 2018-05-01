import React, { Component } from "react";
import "./Section.css";
import { Container, Col } from "reactstrap";

class Section extends Component {
  render() {
    return (
      <div
        className="Section"
        id={this.props.id}
        style={{
          background: this.props.backgroundColor
            ? this.props.backgroundColor
            : null
        }}
      >
        <Container>
          <Col lg={{ size: 10, offset: 1 }}>
            <h2 style={{ paddingBottom: "20px", textAlign: "left" }}>
              {this.props.header}
            </h2>
            {this.props.children}
          </Col>
        </Container>
      </div>
    );
  }
}

export default Section;
