import React, { Component } from "react";
import "./ButtonSet.css";
import { Col, Row, Button } from "reactstrap";

class ButtonSet extends Component {
  constructor(props) {
    super(props);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleBackClick() {
    this.props.backButton();
  }

  handleSubmitClick() {
    this.props.nextButton();
  }

  render() {
    const size = this.props.size ? this.props.size : 2;
    const offset = (12 - 2 * size) / 2;

    return (
      <Row style={this.props.style ? this.props.style : null}>
        <Col sm={{ size: size, offset: offset }}>
          <Button
            outline
            color="secondary"
            className="ButtonSet-button"
            onClick={this.handleBackClick}
            block
          >
            {this.props.backText ? this.props.backText : "Reset"}
          </Button>
        </Col>
        <Col sm={{ size: size }}>
          <Button
            color="primary"
            className="ButtonSet-button"
            onClick={this.handleSubmitClick}
            block
          >
            {this.props.nextText ? this.props.nextText : "Review"}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default ButtonSet;
